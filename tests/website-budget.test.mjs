import assert from "node:assert/strict";
import test from "node:test";
import { websiteBudget, cappedCost } from "../app/website-budget.mjs";

test("brand-new Mini website charges registration once and annual hosting thereafter", () => {
  const result = websiteBudget({ project: 899, domainType: "new",
    domainRegistration: 20, domainRenewal: 90, hostingFirstYear: 200, hostingRenewal: 300 });
  assert.equal(result.project, 899);
  assert.equal(result.domainFirstYear, 20);
  assert.equal(result.firstYear, 1119);
  assert.equal(result.nextYear, 390);
  assert.equal(result.threeYears, 1899);
});

test("existing domain already paid does not get renewed twice in the first year", () => {
  const result = websiteBudget({ project: 1449, domainType: "own",
    existingDomainFirstYear: 0, domainRenewal: 90, hostingFirstYear: 200, hostingRenewal: 300 });
  assert.equal(result.domainFirstYear, 0);
  assert.equal(result.firstYear, 1649);
  assert.equal(result.nextYear, 390);
  assert.equal(result.threeYears, 2429);
});

test("existing domain renewing in year one is charged when explicitly entered", () => {
  const result = websiteBudget({ project: 1449, domainType: "own",
    existingDomainFirstYear: 90, domainRenewal: 90, hostingFirstYear: 200, hostingRenewal: 300 });
  assert.equal(result.firstYear, 1739);
  assert.equal(result.threeYears, 2519);
});

test("monthly care is included for all three years", () => {
  const result = websiteBudget({ project: 899, careMonthly: 79, domainType:"own" });
  assert.equal(result.careYear, 948);
  assert.equal(result.firstYear, 1847);
  assert.equal(result.nextYear, 948);
  assert.equal(result.threeYears, 3743);
});

test("invalid or negative amounts cannot reduce total price", () => {
  for (const value of ["bad", null, -250, Number.NaN, -Infinity]) assert.equal(cappedCost(value), 0);
  assert.equal(cappedCost(123456789),100000);
  const result = websiteBudget({ project: -900, domainRegistration: -200, domainRenewal: -20,
    hostingFirstYear: -100, hostingRenewal: -100, careMonthly: -12 });
  assert.equal(result.firstYear, 0);
  assert.equal(result.nextYear, 0);
  assert.equal(result.threeYears, 0);
});
