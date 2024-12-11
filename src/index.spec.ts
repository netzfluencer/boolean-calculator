import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  it('should return true for "TRUE"', () => {
    const result = BooleanCalculator.calculate("TRUE");
    expect(result).toBe(true);
  });
  it('should return false for "FALSE"', () => {
    const result = BooleanCalculator.calculate("FALSE");
    expect(result).toBe(false);
  });
});
