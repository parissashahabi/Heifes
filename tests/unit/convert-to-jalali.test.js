import convertToJalali from "../../common/functions/convert-to-jalali";

describe("Testing common functions", () => {

    test('function must convert "Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)" into "1401/03/07"', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");
        expect(convertToJalali(currentDate.toISOString())).toBe("1401/03/07");
    });

    test('function must NOT convert "Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)" into "1401/3/7"', () => {
        const currentDate = new Date("Sat May 28 2022 07:45:46 GMT+0430 (Iran Daylight Time)");
        expect(convertToJalali(currentDate.toISOString())).not.toBe("1401/3/7");
    });


});