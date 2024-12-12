import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
  describe("syntax validation", () => {
    it.each([
      ["", "STATEMENT_WITHOUT_BOOLEAN"],
      ["FOO FALSE", "STATEMENT_WITH_INVALID_OPERATOR"],
      ["FALSE FOO", "STATEMENT_WITH_INVALID_OPERATOR"],
      ["FALSE AND NOT", "STATEMENT_WITH_STANDALONE_NOT_OPERATOR"],
      ["NOT AND FALSE", "STATEMENT_WITH_STANDALONE_NOT_OPERATOR"],
      ["FALSE FALSE", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
      ["TRUE FALSE", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
      ["(NOT TRUE) NOT FALSE", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
      ["((NOT TRUE) NOT FALSE)", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
      ["FALSE (NOT TRUE)", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
      ["TRUE NOT FALSE", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
      ["TRUE AND AND FALSE", "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN"],
      ["TRUE OR AND FALSE", "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN"],
      ["AND FALSE", "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN"],
      ["FALSE OR", "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN"],
      ["((TRUE)", "PARENTHESIS_MISMATCH"],
      ["FALSE)", "PARENTHESIS_MISMATCH"],
      ["TRUE || ()", "STATEMENT_WITH_INVALID_OPERATOR"],
    ])(
      `should for "%s" throw an error with the message "%s"`,
      (statement, expectedErrorMessage) => {
        expect(() => BooleanCalculator.calculate(statement)).toThrowError(
          expectedErrorMessage
        );
      }
    );
  });
  describe("calculation", () => {
    it.each([
      ["TRUE", true],
      ["FALSE", false],
      ["tRuE", true],
      [" FALSE ", false],
      ["NOT FALSE", true],
      ["NOT NOT FALSE", false],
      ["TRUE AND FALSE", false],
      ["TRUE AND TRUE", true],
      ["FALSE AND FALSE", false],
      ["FALSE OR FALSE", false],
      ["TRUE OR FALSE", true],
      ["FALSE OR TRUE", true],
      ["TRUE OR TRUE", true],
      ["TRUE AND NOT FALSE", true],
      ["TRUE OR TRUE OR TRUE AND FALSE", true || true || (true && false)],
      ["FALSE OR FALSE OR TRUE AND FALSE", false || false || (true && false)],
      ["TRUE OR FALSE AND NOT FALSE", true || (false && !false)],
      ["(TRUE)", true],
      ["(FALSE)", false],
      ["(TRUE) AND TRUE", true],
      ["(FALSE) OR TRUE", true],
      ["FALSE OR (TRUE)", true],
      ["(TRUE OR FALSE) AND TRUE", (true || false) && true],
      ["((TRUE) AND (TRUE))", true],
      ["NOT ((TRUE) AND (TRUE))", false],
    ])(`should for "%s" return %s`, (statement, expectedResult) => {
      const result = BooleanCalculator.calculate(statement);
      expect(result).toBe(expectedResult);
    });
  });
});
