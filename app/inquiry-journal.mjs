/** One SQL write chooses the winning lead even when identical submissions race. */
export async function saveInquiryOnce(binding, data, cutoff) {
  const {name,email,company,budget,message}=data;
  const existing = () => binding.prepare('SELECT id FROM inquiries WHERE email = ? AND name = ? AND company = ? AND budget = ? AND message = ? AND created_at >= ? ORDER BY id DESC LIMIT 1').bind(email,name,company,budget,message,cutoff).first();
  const inserted = await binding.prepare("INSERT INTO inquiries (name,email,company,budget,message,status,created_at) SELECT ?,?,?,?,?, 'Nowe',? WHERE NOT EXISTS (SELECT 1 FROM inquiries WHERE email = ? AND name = ? AND company = ? AND budget = ? AND message = ? AND created_at >= ?) RETURNING id")
    .bind(name,email,company,budget,message,new Date().toISOString(),email,name,company,budget,message,cutoff).first();
  if (inserted) return {id:inserted.id,duplicate:false};
  const previous = await existing();
  if (!previous) throw new Error('Inquiry was not saved.');
  return {id:previous.id,duplicate:true};
}

/** Claim once in D1 before contacting SMTP. Ambiguous results require owner review, never automatic SMTP replay. */
export async function deliverInquiryOnce(binding, inquiryId, send, { duplicate = false } = {}) {
  const latest = () => binding.prepare('SELECT state, provider_status FROM inquiry_deliveries WHERE inquiry_id = ? ORDER BY id DESC LIMIT 1').bind(inquiryId).first();
  const previous = await latest();
  if (previous) return { confirmed: previous.state === 'sent' };
  // Old saved inquiries without a journal entry must not be replayed during a release or retry.
  if (duplicate) return { confirmed: false };
  const claim = await binding.prepare("INSERT INTO inquiry_deliveries (inquiry_id, state, created_at, provider_status) SELECT ?, 'pending', ?, 'awaiting_acknowledgement' WHERE NOT EXISTS (SELECT 1 FROM inquiry_deliveries WHERE inquiry_id = ?) RETURNING id")
    .bind(inquiryId, new Date().toISOString(), inquiryId).first();
  if (!claim) return { confirmed: (await latest())?.state === 'sent' };
  let acknowledgement;
  try { acknowledgement = await send(); }
  catch {
    await binding.prepare("UPDATE inquiry_deliveries SET state = 'failed', provider_status = 'unconfirmed_review_before_retry' WHERE id = ? AND state = 'pending'").bind(claim.id).run().catch(() => {});
    return { confirmed: false };
  }
  try {
    const provider = typeof acknowledgement === 'string' ? acknowledgement : 'provider_accepted';
    await binding.prepare("UPDATE inquiry_deliveries SET state = 'sent', provider_status = ? WHERE id = ? AND state = 'pending'").bind(provider, claim.id).run();
    return { confirmed: true };
  } catch { return { confirmed: false }; }
}

/** This information belongs only in the authenticated owner panel. */
export async function inquiryDeliveryStates(binding) {
  const rows = await binding.prepare('SELECT inquiry_id, state FROM inquiry_deliveries ORDER BY id DESC').all();
  const states = new Map();
  for (const row of rows.results || []) if (!states.has(row.inquiry_id)) states.set(row.inquiry_id, row.state);
  return states;
}
