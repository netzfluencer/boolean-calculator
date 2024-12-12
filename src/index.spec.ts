import { BooleanCalculator } from "./index";

describe("boolean calculator", () => {
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
  ])(`should for "%s" return %s`, (statement, expectedResult) => {
    const result = BooleanCalculator.calculate(statement);
    expect(result).toBe(expectedResult);
  });
  it.each([
    ["", "STATEMENT_WITHOUT_BOOLEAN"],
    ["FOO FALSE", "STATEMENT_WITH_INVALID_OPERATOR"],
    ["FALSE FOO", "STATEMENT_WITH_INVALID_OPERATOR"],
    ["FALSE AND NOT", "STATEMENT_WITH_STANDALONE_NOT_OPERATOR"],
    ["NOT AND FALSE", "STATEMENT_WITH_STANDALONE_NOT_OPERATOR"],
    ["FALSE FALSE", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
    ["TRUE FALSE", "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR"],
  ])(
    `should for "%s" throw an error with the message "%s"`,
    (statement, expectedErrorMessage) => {
      expect(() => BooleanCalculator.calculate(statement)).toThrowError(
        expectedErrorMessage
      );
    }
  );
});
