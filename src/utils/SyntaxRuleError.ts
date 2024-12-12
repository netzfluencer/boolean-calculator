const syntaxErrorMessages = [
  "STATEMENT_WITHOUT_BOOLEAN",
  "STATEMENT_WITH_INVALID_OPERATOR",
  "STATEMENT_WITH_STANDALONE_NOT_OPERATOR",
  "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR",
] as const;
export type SyntaxRuleErrorMessage = (typeof syntaxErrorMessages)[number];

export class SyntaxRuleError extends Error {
  constructor(message: SyntaxRuleErrorMessage) {
    super(message);
    this.name = "SyntaxRuleError";
  }
}
