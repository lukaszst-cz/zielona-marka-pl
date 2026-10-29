/** Edge counters span Worker isolates within a Cloudflare location; they are approximate, not a strict global quota. */
export async function checkEdgeRateLimit(runtime, bindingName, request) {
  const limiter = runtime[bindingName];
  const ip = request.headers.get('CF-Connecting-IP');
  // Local and binding-free UI previews do not carry Cloudflare's trusted address header.
  if (!limiter) return { available: !ip, allowed: !ip };
  try {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip || 'local-preview'));
    const key = bindingName + ':' + Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
    const result = await limiter.limit({ key });
    return { available: true, allowed: result.success === true };
  } catch { return { available: false, allowed: false }; }
}
