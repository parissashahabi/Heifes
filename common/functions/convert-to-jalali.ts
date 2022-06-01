import moment from "jalali-moment";
export default function convertToJalali(date?: string) {
  return moment(date)?.format("jYYYY/jMM/jDD");
}