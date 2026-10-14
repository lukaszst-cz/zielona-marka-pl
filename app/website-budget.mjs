/**
 * Shared pricing calculation used by ZM Studio and the offer calculator.
 * All amounts are illustrative net PLN, not legally binding quotes.
 * A domain already owned by the customer is not charged again in year one
 * unless a renewal falls in that year and the user explicitly enters it.
 */
export function cappedCost(input) {
  const parsed = Number(input);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(100000, parsed)) : 0;
}

export function websiteBudget({
  project = 0,
  domainType = "new",
  domainRegistration = 0,
  existingDomainFirstYear = 0,
  domainRenewal = 0,
  hostingFirstYear = 0,
  hostingRenewal = 0,
  careMonthly = 0,
} = {}) {
  const domainFirstYear = domainType === "new"
    ? cappedCost(domainRegistration)
    : cappedCost(existingDomainFirstYear);
  const domainNextYear = cappedCost(domainRenewal);
  const careYear = cappedCost(careMonthly) * 12;
  const providerFirst = domainFirstYear + cappedCost(hostingFirstYear);
  const providerRenew = domainNextYear + cappedCost(hostingRenewal);
  const projectPrice = cappedCost(project);
  return {
    project: projectPrice,
    domainFirstYear,
    careYear,
    providerFirst,
    providerRenew,
    firstYear: projectPrice + providerFirst + careYear,
    nextYear: providerRenew + careYear,
    threeYears: projectPrice + providerFirst + 3 * careYear + 2 * providerRenew,
  };
}
