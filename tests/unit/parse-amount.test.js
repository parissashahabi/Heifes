import {parseAmount} from "../../common/functions/parse-amount";

describe("Testing common functions", () => {

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
});