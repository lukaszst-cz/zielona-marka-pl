// Filtr zgłoszeń wysyłanych maszynowo przez formularz kontaktowy.
// Odrzucane zgłoszenie dostaje taką samą odpowiedź jak pułapka honeypot,
// więc nadawca nie wie, która reguła zadziałała.

const MESSENGER_PATTERNS = [
  /t\.me\//i,
  /wa\.me\//i,
  /telegram\s*[:@-]/i,
  /whats\s?app\s*[:@-]/i,
  /@?\bskype\b\s*[:@-]/i,
];

const PROMO_PATTERNS = [
  /contact\s+forms?\b/i,
  /formularz(y|e|ów)?\s+kontaktow\w*/i,
  /bulk\s+(messages?|mail)/i,
  /mass\s+(messages?|mailing)/i,
  /million\s+messages/i,
  /milion\w*\s+wiadomo\w+/i,
  /\bseo\s+(services?|offer)\b/i,
];

function linkCount(text) {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length;
}

function looksLikeRandomToken(value) {
  return /[A-Z]{7,}\d{3,}[A-Z]{3,}/.test(value) || /^[A-Z]{10,}$/.test(value.replace(/\s+/g, ""));
}

export function looksLikeFormSpam({ name = "", email = "", company = "", message = "", website = "" } = {}) {
  const haystack = `${name}\n${company}\n${message}\n${website}`;
  if (MESSENGER_PATTERNS.some(pattern => pattern.test(haystack))) return true;
  if (PROMO_PATTERNS.some(pattern => pattern.test(message)) && linkCount(haystack) > 0) return true;
  if (linkCount(message) >= 2) return true;
  if (looksLikeRandomToken(name) || looksLikeRandomToken(message)) return true;
  if (/[Ѐ-ӿ]/.test(haystack)) return true;
  if (/^no[._-]?reply[._-]?/i.test(email)) return true;
  if (/no-site\.com$/i.test(website.trim())) return true;
  return false;
}

export default looksLikeFormSpam;
