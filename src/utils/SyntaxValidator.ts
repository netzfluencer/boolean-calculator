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
        regex:
          /^(\(*(TRUE|FALSE|NOT|AND|OR)\)*)(\s(\(*(TRUE|FALSE|NOT|AND|OR)\)*))*$/,
        negated: true,
        errorMessage: "STATEMENT_WITH_INVALID_OPERATOR",
      },
      {
        regex: /(NOT\s(AND|OR))|NOT$/,
        errorMessage: "STATEMENT_WITH_STANDALONE_NOT_OPERATOR",
      },
      {
        regex: /(TRUE|FALSE)\s(TRUE|FALSE|NOT)/,
        errorMessage: "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR",
      },
      {
        regex: /(AND|OR)\s(AND|OR)/,
        errorMessage: "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN",
      },
      {
        regex: /(^(AND|OR))|((AND|OR)$)/,
        errorMessage: "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN",
      },
    ] satisfies SyntaxRuleProps[]
  ).map((syntaxRule) => new SyntaxRule(syntaxRule));
  static validate(stringifiedStatement: string) {
    this.#syntaxRules.map((syntaxRule) =>
      syntaxRule.validate(stringifiedStatement)
    );
  }
}
