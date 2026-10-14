/**
 * Shared, non-binding price calculations in net PLN.
 * Existing domains are only billed in year one if the customer enters a
 * renewal that actually falls during that period.
 * @typedef {{
 *  project?: number,
 *  domainType?: string,
 *  domainRegistration?: number,
 *  existingDomainFirstYear?: number,
 *  domainRenewal?: number,
 *  hostingFirstYear?: number,
 *  hostingRenewal?: number,
 *  careMonthly?: number
 * }} WebsiteBudgetInput
 */
export function cappedCost(input) {
  const parsed = Number(input);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(100000, parsed)) : 0;
}

/** @param {WebsiteBudgetInput} values */
export function websiteBudget({
  project = 0, domainType = "new", domainRegistration = 0,
  existingDomainFirstYear = 0, domainRenewal = 0,
  hostingFirstYear = 0, hostingRenewal = 0, careMonthly = 0,
} = {}) {
  const domainFirstYear = domainType === "new" ? cappedCost(domainRegistration) : cappedCost(existingDomainFirstYear);
  const providerFirst = domainFirstYear + cappedCost(hostingFirstYear);
  const providerRenew = cappedCost(domainRenewal) + cappedCost(hostingRenewal);
  const careYear = cappedCost(careMonthly) * 12;
  const projectCost = cappedCost(project);
  return {
    project: projectCost, domainFirstYear, providerFirst, providerRenew, careYear,
    firstYear: projectCost + providerFirst + careYear,
    nextYear: providerRenew + careYear,
    threeYears: projectCost + providerFirst + providerRenew * 2 + careYear * 3,
  };
}
