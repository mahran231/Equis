// Content visibility controls. Enable only after the owner supplies approved material.
export const contentConfig = {
  transformationsEnabled: false,
  recipesEnabled: false,
  testimonialsEnabled: false,
  publishPrices: false,

  // Set to true once the owner has approved all public website copy
  // (hero, services, FAQ answers, about). While false, a small preview banner
  // is shown. Search engines may index the site only when this is true AND
  // NEXT_PUBLIC_SITE_URL is set to the real domain (see src/lib/indexing.ts).
  copyApproved: true, // approved by the owner on 2026-11-20

  // Set to true only after the Privacy Policy and Terms of Use have been
  // reviewed for Egypt and the target Gulf markets. While false, both pages
  // show a visible "draft – not legally reviewed" notice.
  legalReviewed: false,
  // ISO date (YYYY-MM-DD) shown on legal pages once they are reviewed.
  legalLastUpdated: "",
};
