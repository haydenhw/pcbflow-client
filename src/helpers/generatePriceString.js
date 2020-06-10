export default function generatePriceString(price) {
  const twoDecimalString = price.toFixed(2);
  return `$${twoDecimalString}`;
}
