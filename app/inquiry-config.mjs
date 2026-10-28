/** Public readiness never exposes credentials. Activation follows a real delivery test. */
export function inquiryFormEnabled(env) {
  return env?.INQUIRY_FORM_ENABLED === "1"
    && Boolean(env.DB && (env.SMTP_PASSWORD || (env.RESEND_API_KEY && env.INQUIRY_NOTIFICATION_FROM && env.INQUIRY_NOTIFICATION_TO)));
}
