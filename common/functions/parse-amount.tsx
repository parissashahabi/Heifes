export const parseAmount = (value: number | string | undefined) => {
  if (!value) return "";
  const regex = /,/g;
  const parsedNumber = Number(value.toString().replace(regex, ''));
  return parsedNumber.toLocaleString("en-AU").toString();
};
