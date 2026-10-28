/** Bounded, idempotent provider call. A provider acknowledgement is not proof of inbox delivery. */
export async function sendInquiryNotification(data, runtime, request = fetch) {
  if (!runtime.RESEND_API_KEY || !runtime.INQUIRY_NOTIFICATION_FROM || !runtime.INQUIRY_NOTIFICATION_TO) {
    throw new Error("Inquiry notification is not configured.");
  }
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await request("https://api.resend.com/emails", {
        method: "POST",
        signal: AbortSignal.timeout(8000),
        headers: {
          Authorization: `Bearer ${runtime.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `zm-inquiry-${data.id}`,
        },
        body: JSON.stringify({
          from: runtime.INQUIRY_NOTIFICATION_FROM,
          to: [runtime.INQUIRY_NOTIFICATION_TO],
          reply_to: data.email,
          subject: `Zapytanie nr ${data.id}: ${data.name}`,
          text: `Numer zgłoszenia: ${data.id}\nImię: ${data.name}\nE-mail: ${data.email}\nFirma: ${data.company || "nie podano"}\n\n${data.message}`,
        }),
      });
      if (!response.ok) {
        // Retry transient failures only. Never retry an invalid key or sender.
        const retryable = response.status === 429 || response.status >= 500;
        await response.body?.cancel();
        if (!retryable || attempt === 2) throw new Error("Notification provider rejected the message.");
        continue;
      }
      const result = await response.json();
      if (!result || typeof result.id !== "string" || !result.id) throw new Error("Notification acknowledgement is missing.");
      return { providerId: result.id };
    } catch (error) {
      if (attempt === 2 || (error instanceof Error && error.message === "Notification provider rejected the message.")) throw error;
    }
  }
  throw new Error("Notification was not acknowledged.");
}
