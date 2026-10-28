/** Retry a failed read once; never turn a persistent failure into a pass. */
export async function fetchSeoPage(url, {
  request = fetch,
  timeoutMs = 18000,
  retryDelayMs = 500,
  onRetry = () => {},
} = {}) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await request(url, {
        signal: AbortSignal.timeout(timeoutMs),
        headers: { "User-Agent": "ZielonaMarka-TechnicalSeoQA/1.0" },
        redirect: "follow",
      });
      // The timeout covers reading the body as well as receiving headers.
      return { response, body: await response.text() };
    } catch (error) {
      if (attempt === 2) throw error;
      onRetry(error);
    }
    if (retryDelayMs > 0) await new Promise(resolve => setTimeout(resolve, retryDelayMs));
  }
}
