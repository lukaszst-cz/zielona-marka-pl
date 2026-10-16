/* Small, stable first-party script: recover a tab left open across deployments.
   Only dynamic imports of this site's versioned application chunks qualify. */
(function () {
  "use strict";
  var key = "zm_stale_chunk_reloaded_at";
  var cooldownMs = 30 * 60 * 1000;

  function messageOf(event) {
    var reason = event && (event.payload || event.reason || event.error);
    if (typeof reason === "string") return reason;
    return reason && typeof reason.message === "string" ? reason.message : "";
  }

  function recover(event) {
    var message = messageOf(event);
    if (!/(?:Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk .* failed)/i.test(message)) return;
    if (!/\/_next\/static\/[^\s?#]+\.m?js(?:\b|\?)/i.test(message)) return;
    var now = Date.now();
    try {
      var previous = Number(sessionStorage.getItem(key)) || 0;
      if (previous > 0 && now >= previous && now - previous < cooldownMs) return;
      // Persist before navigation: a failed or stale response cannot cause a reload loop.
      sessionStorage.setItem(key, String(now));
    } catch (_) {
      // If storage is blocked, never retry without a reliable loop guard.
      return;
    }
    if (event && typeof event.preventDefault === "function") event.preventDefault();
    window.location.reload();
  }

  window.addEventListener("vite:preloadError", recover);
  window.addEventListener("unhandledrejection", recover);
})();
