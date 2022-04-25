import { numberToWords } from "@persian-tools/persian-tools";
import { maxSafeIntegerValue } from "@/common/constants";

const parseNumberToPersianWord = (
  rialiNumber?: string | number,
  postfix: string = "",
) => {
  if (!rialiNumber) {
    return "";
  }
  const numberString = rialiNumber.toString().replaceAll(",", "");
  if (Number(numberString) <= maxSafeIntegerValue && numberString.length > 1) {
    const word = numberToWords(numberString?.substring(0, numberString.length - 1));
    return `${word} ${postfix}`;
  }
  return "";
};

export default parseNumberToPersianWord;
