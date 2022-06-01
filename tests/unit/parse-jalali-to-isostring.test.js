import {parseJalaliToIsoString} from "../../common/functions/parse-jalali-to-iso-string";


describe("Testing common functions", () => {

    test('function must convert Date type to String', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");

        expect(parseJalaliToIsoString(currentDate)).toBe(currentDate.toISOString());
    });

    test('function must NOT return Date type', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");

        expect(parseJalaliToIsoString(currentDate)).not.toBe(currentDate);
    });

});