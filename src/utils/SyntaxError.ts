const syntaxErrorMessages = [
  "STATEMENT_WITHOUT_BOOLEAN",
  "STATEMENT_WITH_INVALID_OPERATOR",
  "STATEMENT_WITH_STANDALONE_NOT_OPERATOR",
] as const;
export type BooleanCalculatorSyntaxErrorMessage =
  (typeof syntaxErrorMessages)[number];

export class BooleanCalculatorSyntaxError extends Error {
  constructor(message: BooleanCalculatorSyntaxErrorMessage) {
    super(message);
    this.name = "BooleanCalculatorSyntaxError";
  }
}
