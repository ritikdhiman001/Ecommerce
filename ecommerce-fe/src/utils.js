export const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2, // Ensure at least two decimal places
  maximumFractionDigits: 2, // Limit to two decimal places
});
