import { type SyntaxRuleProps, SyntaxRule } from "./SyntaxRule";

export class SyntaxValidator {
  static #syntaxRules = (
    [
      {
        regex: /(TRUE|FALSE)/,
        negated: true,
        errorMessage: "STATEMENT_WITHOUT_BOOLEAN",
      },
      {
        regex: /^(TRUE|FALSE|NOT|AND)(\s(TRUE|FALSE|NOT|AND))*$/,
        negated: true,
        errorMessage: "STATEMENT_WITH_INVALID_OPERATOR",
      },
      {
        regex: /(NOT\s(AND|OR))|NOT$/,
        errorMessage: "STATEMENT_WITH_STANDALONE_NOT_OPERATOR",
      },
    ] satisfies SyntaxRuleProps[]
  ).map((syntaxRule) => new SyntaxRule(syntaxRule));
  static validate(stringifiedStatement: string) {
    this.#syntaxRules.map((syntaxRule) =>
      syntaxRule.validate(stringifiedStatement)
    );
  }
}
