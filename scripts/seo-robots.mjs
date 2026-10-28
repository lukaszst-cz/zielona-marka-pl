/**
 * Detect noindex directives in crawler headers and HTML metadata.
 * Handles either attribute order and both generic and Googlebot-specific tags.
 */
export function hasNoindex(html, xRobotsTag = "") {
  if (/\bnoindex\b/i.test(xRobotsTag)) return true;
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return metaTags.some(tag => {
    const name = tag.match(/\bname\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (name !== "robots" && name !== "googlebot") return false;
    const directives = tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
    return /\bnoindex\b/i.test(directives);
  });
}

/** Evaluate groups for the selected crawler, not unrelated AI crawler blocks. */
export function isRobotsPathBlocked(text, path = "/", userAgent = "Googlebot") {
  const groups = [];
  let group = { agents: [], rules: [] };
  for (const line of text.split(/\r?\n/)) {
    const match = line.replace(/#.*/, "").trim().match(/^([\w-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    const [, field, raw] = match;
    const key = field.toLowerCase();
    const value = raw.trim();
    if (key === "user-agent") {
      if (group.rules.length) { groups.push(group); group = { agents: [], rules: [] }; }
      group.agents.push(value.toLowerCase());
    } else if ((key === "allow" || key === "disallow") && group.agents.length) {
      group.rules.push({ allow: key === "allow", path: value });
    }
  }
  groups.push(group);
  const agent = userAgent.toLowerCase();
  const specificity = group => Math.max(-1, ...group.agents.map(token => token === "*" ? 0 : token === agent ? token.length : -1));
  const best = Math.max(-1, ...groups.map(specificity));
  const rules = groups.filter(group => best >= 0 && specificity(group) === best).flatMap(group => group.rules);
  let length = -1;
  let allowed = true;
  for (const rule of rules) {
    if (!rule.path) continue;
    const anchored = rule.path.endsWith("$");
    const value = anchored ? rule.path.slice(0, -1) : rule.path;
    const pattern = value.split("*").map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*");
    if (!new RegExp("^" + pattern + (anchored ? "$" : "")).test(path)) continue;
    const size = rule.path.length;
    if (size > length) { length = size; allowed = rule.allow; }
    else if (size === length && rule.allow) allowed = true;
  }
  return !allowed;
}
