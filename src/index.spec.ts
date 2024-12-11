import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  it.each([
    ["TRUE", true],
    ["FALSE", false],
    ["tRuE", true],
    [" FALSE ", false],
    ["NOT FALSE", true],
    ["NOT NOT FALSE", false],
  ])("should for %s return %s", (statement, expectedResult) => {
    const result = BooleanCalculator.calculate(statement);
    expect(result).toBe(expectedResult);
  });
  it('should throw an error with the message "STATEMENT_WITHOUT_BOOLEAN" for ""', () => {
    expect(() => BooleanCalculator.calculate("")).toThrowError(
      "STATEMENT_WITHOUT_BOOLEAN"
    );
  });
  it('should throw an error with the message "STATEMENT_WITH_INVALID_OPERATOR" for "FOO FALSE"', () => {
    expect(() => BooleanCalculator.calculate("FOO FALSE")).toThrowError(
      "STATEMENT_WITH_INVALID_OPERATOR"
    );
  });
});
