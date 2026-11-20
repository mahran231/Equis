// Content visibility controls. Enable only after the owner supplies approved material.
export const contentConfig = {
  transformationsEnabled: false,
  recipesEnabled: false,
  testimonialsEnabled: false,
  publishPrices: false,

  // Set to true once the owner has approved all public website copy
  // (hero, services, FAQ answers, about). While false, a small preview banner
  // is shown and search engines are asked not to index the site.
  copyApproved: false,

  // Set to true only after the Privacy Policy and Terms of Use have been
  // reviewed for Egypt and the target Gulf markets. While false, both pages
  // show a visible "draft – not legally reviewed" notice.
  legalReviewed: false,
  // ISO date (YYYY-MM-DD) shown on legal pages once they are reviewed.
  legalLastUpdated: "",
};
