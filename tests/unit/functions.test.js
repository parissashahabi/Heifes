import convertToJalali from "../../common/functions/convert-to-jalali";
import {parseAmount} from "../../common/functions/parse-amount";
import {parseJalaliToIsoString} from "../../common/functions/parse-jalali-to-iso-string";


describe("Testing common functions", () => {

    test('function must convert "Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)" into "1401/03/07"', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");
        expect(convertToJalali(currentDate.toISOString())).toBe("1401/03/07");
    });

    test('function must NOT convert "Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)" into "1401/3/7"', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");
        expect(convertToJalali(currentDate.toISOString())).not.toBe("1401/3/7");
    });

    test('function must convert 120000 into 120,000', () => {
        expect(parseAmount("120000")).toBe("120,000");
    });

    test('function must not crash ', () => {
        expect(parseAmount("1,120,000")).toBe("1,120,000");
    });

    test('function must return empty string', () => {
        let amount;
        expect(parseAmount(amount)).toBe("");
    });

    test('function must convert Date type to String', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");

        expect(parseJalaliToIsoString(currentDate)).toBe(currentDate.toISOString());
    });

    test('function must NOT return Date type', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");

        expect(parseJalaliToIsoString(currentDate)).not.toBe(currentDate);
    });

});