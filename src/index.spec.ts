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
  it('should throw an error with the message "STATEMENT_WITHOUT_BOOLEAN" for ""', () => {
    expect(() => BooleanCalculator.calculate("")).toThrowError(
      "STATEMENT_WITHOUT_BOOLEAN"
    );
  });
  it('should return true for "tRuE"', () => {
    const result = BooleanCalculator.calculate("tRuE");
    expect(result).toBe(true);
  });
  it('should return false for " FALSE "', () => {
    const result = BooleanCalculator.calculate(" FALSE ");
    expect(result).toBe(false);
  });
  it('should throw an error with the message "STATEMENT_WITH_INVALID_OPERATOR" for "FOO FALSE"', () => {
    expect(() => BooleanCalculator.calculate("FOO FALSE")).toThrowError(
      "STATEMENT_WITH_INVALID_OPERATOR"
    );
  });
});
