export const parseAmountWithRial = (value: number | string) => {
  if (value) {
    return `${Number(value).toLocaleString("en-AU").toString()} ریال`;
  }
  return "";
};
