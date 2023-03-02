export function formatNumber(num: Number) {
  if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") || 0;
}

export const format4dpNumber = (number: any) => {
  const roundedValue = Number(number).toFixed(2).toString();

  return roundedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
