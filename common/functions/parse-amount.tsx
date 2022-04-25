export const parseAmount = (value: number | string | undefined) => {
  if (!value) return "";
  const parsedNumber = Number(value.toString().replaceAll(",", ""));
  return parsedNumber.toLocaleString("en-AU").toString();
};
