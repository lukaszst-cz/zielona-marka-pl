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

/** Enforce the limit while streaming, including requests without Content-Length. */
export async function limitedRequestBody(request, limit = 4096) {
  const reader = request.body?.getReader();
  const chunks = [];
  let size = 0;
  if (reader) {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > limit) {
          await reader.cancel();
          throw new RangeError('Request body too large');
        }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
  }
  return new Response(new Blob(chunks), { headers: { 'Content-Type': request.headers.get('Content-Type') || '' } });
}

export async function limitedFormData(request, limit = 4096) {
  return (await limitedRequestBody(request, limit)).formData();
}
