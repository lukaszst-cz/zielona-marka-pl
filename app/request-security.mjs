/** Browser mutations must originate from this site; non-browser API clients remain supported. */
export function isSameSiteMutation(request) {
  try {
    const origin = request.headers.get('origin');
    const site = request.headers.get('sec-fetch-site');
    return (!origin || new URL(origin).origin === new URL(request.url).origin)
      && (!site || ['same-origin', 'same-site', 'none'].includes(site));
  } catch { return false; }
}

export function privateJson(body, init = {}) {
  const headers = new Headers(init.headers);
  headers.set('Cache-Control', 'private, no-store, max-age=0');
  headers.set('Pragma', 'no-cache');
  headers.set('Vary', 'Cookie');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  return Response.json(body, { ...init, headers });
}
