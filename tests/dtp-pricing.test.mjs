import test from "node:test";
import assert from "node:assert/strict";
import { priceDtp } from "../app/dtp-pricing.mjs";

const template = {
  kind: "gazetka", format: "a4", pages: 8, imageFiles: 12,
  textFiles: 4, textStatus: "ready", imageStatus: "ready", projectStatus: "ready",
  frequency: "weekly", changeLevel: "minor", editions: 12,
};

test("one-off quote never includes loyalty discounts", () => {
  const quote = priceDtp({ ...template, frequency: "once" });
  assert.equal(quote.count, 1);
  assert.equal(quote.first, quote.oneOff);
  assert.equal(quote.saved, 0);
  assert.equal(quote.series[0].discountPercent, 0);
});

test("discount grows progressively with small edits and stops at 40%", () => {
  const q = priceDtp(template);
  assert.equal(q.series[0].discountPercent, 5);
  assert.deepEqual(q.series.slice(1, 6).map((e) => e.discountPercent), [18, 22, 26, 30, 34]);
  assert.equal(q.series[7].discountPercent, 40);
  assert.equal(q.series[11].discountPercent, 40);
  assert(q.series.every((edition, index, arr) => index === 0 || edition.amount <= arr[index - 1].amount));
  assert.equal(q.total, q.series.reduce((sum, e) => sum + e.amount, 0));
  assert.equal(q.saved, q.oneOff * q.count - q.total);
});

test("medium change series caps at 30%; major work caps at 15%", () => {
  for (const [changeLevel, expectedCap] of [["medium", 30], ["major", 15]]) {
    const q = priceDtp({ ...template, changeLevel, editions: 24 });
    assert.equal(q.series.at(-1).discountPercent, expectedCap);
    assert(q.series.every((e) => e.discountPercent <= expectedCap));
  }
});

test("nonreusable copywriting, rush and variants are not discounted", () => {
  const q = priceDtp({ ...template, textStatus: "writing", stockPhotos: 8,
    versions: 3, urgent: true, editions: 12 });
  const last = q.series.at(-1);
  assert.equal(q.oneOff - last.amount, Math.floor(q.eligible * .40));
  assert(q.oneOff > q.eligible);
});

test("preflight is one-off even if user selects a subscription", () => {
  const q = priceDtp({ ...template, kind: "preflight", frequency: "weekly" });
  assert.equal(q.recurring, false);
  assert.equal(q.count, 1);
  assert.equal(q.series[0].discountPercent, 0);
});

test("invalid input gets bounded and never creates a negative quote", () => {
  const q = priceDtp({
    ...template, pages: 2000, products: 100000, editions: 9999,
    imageFiles: -2, stockPhotos: -1, correctionRounds: -5,
  });
  assert.equal(q.pages, 64);
  assert.equal(q.count, 24);
  assert(q.total >= 0);
  assert(q.series.every((e) => e.amount > 0));
});

test("one-off leaflet, business-card and preflight entry prices match catalog", () => {
  assert.equal(priceDtp({ kind: "ulotka", pages: 1, format: "a5", frequency: "once" }).oneOff, 249);
  assert.equal(priceDtp({ kind: "wizytowka", format: "business", frequency: "once" }).oneOff, 149);
  assert.equal(priceDtp({ kind: "preflight", pages: 1, format: "a4", frequency: "once" }).oneOff, 79);
});
