import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = file => readFile(new URL("../" + file, import.meta.url), "utf8");

test("restored afternoon chapters use their original five illustrations", async () => {
  const home = await read("app/OrganicHome.tsx");
  assert.ok(home.includes('import "./home-v5.css"'));
  assert.ok(home.includes('className="zmh-sample-form zmh-glass"'), "Original form presentation must be restored");
  assert.ok(home.includes('className="zmh-flow zmh-glass"'), "Restore the original CRM timeline");
  assert.ok(home.includes('"zmh-flow-item"'), "Original step illustrations must remain");
  assert.ok(!home.includes('import "./home-calm-story.css"'), "Do not load the evening redesign");
  assert.ok(!home.includes('zmh-calm-flow-steps'), "Do not render the evening workflow cards");
  assert.ok(home.includes("<HomeContactForm />"), "Preserve the real lead form");
  assert.ok(home.includes("<ForestHero />"), "Preserve original river hero and controls");
  assert.ok(home.includes("<HomeStoryMotion />"), "Preserve scroll-driven chapters");
});

test("free offers remain responsive without changing the original forest", async () => {
  const home = await read("app/OrganicHome.tsx");
  const styles = await read("app/home-offers-restored.css");
  assert.ok(home.includes('import "./home-offers-restored.css"'));
  assert.ok(home.includes("<HomeOffersCarousel />"));
  assert.ok(styles.includes(".zm-home-slide[hidden]"), "Only active slide should display");
  assert.ok(styles.includes("@media(max-width:520px)"), "Use compact mobile layout");
  assert.ok(styles.includes("@media(prefers-reduced-motion:reduce)"), "Respect reduced motion");
  assert.ok(!styles.includes("html body .zm-v5 .zmh-forest"), "No full page gradient override");
  assert.ok(!/https?:\/\//.test(styles), "No external image dependencies");
});
