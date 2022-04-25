import moment from "jalali-moment";
export default function convertToJalali(date?: string) {
  return moment(date)?.format("jYYYY/jMM/jDD");
}
export function convertToJalaliWithTime(date?: string) {
  return moment(date)?.format("jYYYY/jMM/jDD hh:mm:ss");
}
