import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = file => readFile(new URL("../" + file, import.meta.url), "utf8");

test("homepage scroll chapters use calm, purposeful examples instead of schematic icon circles", async () => {
  const home = await read("app/OrganicHome.tsx");
  assert.ok(home.includes('import "./home-calm-story.css"'));
  assert.ok(home.includes('className="zmh-calm-form"'), "The inquiry chapter needs the upgraded illustration");
  assert.ok(home.includes('className="zmh-calm-flow zmh-glass"'), "CRM and aftercare need a unified timeline");
  assert.ok(home.includes('className="zmh-calm-flow-steps"'), "Keep the stages legible");
  assert.ok(home.includes('zmh-calm-flow-promise'), "Describe why an orderly workflow saves time");
  assert.ok(home.includes('DEMONSTRACJA'), "Visual examples must not pretend to be real CRM records");
  assert.ok(home.includes("Poglądowa prezentacja formularza"), "Avoid misleading submit affordances");
  assert.ok(!home.includes("zmh-flow-item"), "Remove obsolete decorative icon circles");
  assert.ok(home.includes("<HomeContactForm />"), "Preserve the real lead form");
  assert.ok(home.includes("<ForestHero />"), "Preserve original stream and its controls");
  assert.ok(home.includes("<HomeStoryMotion />"), "Preserve scroll-driven story");
});

test("fern story styles are responsive and respect reduced motion", async () => {
  const styles = await read("app/home-calm-story.css");
  assert.ok(styles.includes("/brand-review-v6/fern-frond.svg"), "Use original fern art, not generated logo replacements");
  assert.ok(styles.includes(".zmh-calm-form-body"));
  assert.ok(styles.includes(".zmh-calm-flow-steps"));
  assert.ok(styles.includes("@media (max-width:700px)"));
  assert.ok(styles.includes("@media (prefers-reduced-motion:reduce)"));
  assert.ok(!/https?:\/\//.test(styles), "Do not add external image requests");
});
