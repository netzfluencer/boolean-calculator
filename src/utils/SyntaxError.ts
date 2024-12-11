const syntaxErrorMessages = ["STATEMENT_WITHOUT_BOOLEAN"] as const;
type SyntaxErrorMessage = (typeof syntaxErrorMessages)[number];

export class BooleanCalculatorSyntaxError extends Error {
  constructor(message: SyntaxErrorMessage) {
    super(message);
    this.name = "BooleanCalculatorSyntaxError";
  }
}
