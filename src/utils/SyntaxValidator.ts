import { type SyntaxRuleProps, SyntaxRule } from "./SyntaxRule";

export class SyntaxValidator {
  static #syntaxRules = (
    [
      {
        validationHandler: (statement) => /(TRUE|FALSE)/.test(statement),
        errorMessage: "STATEMENT_WITHOUT_BOOLEAN",
      },
      {
        validationHandler: (statement) =>
          /^(\(*(TRUE|FALSE|NOT|AND|OR)\)*)(\s(\(*(TRUE|FALSE|NOT|AND|OR)\)*))*$/.test(
            statement
          ),
        errorMessage: "STATEMENT_WITH_INVALID_OPERATOR",
      },
      {
        validationHandler: (statement) =>
          !/(NOT\s(AND|OR))|NOT$/.test(statement),
        errorMessage: "STATEMENT_WITH_STANDALONE_NOT_OPERATOR",
      },
      {
        validationHandler: (statement) =>
          !/(TRUE|FALSE|\(|\))\s(TRUE|FALSE|NOT|\(|\))/.test(statement),
        errorMessage: "STATEMENT_WITHOUT_BOOLEAN_AGGREGATOR",
      },
      {
        validationHandler: (statement) => !/(AND|OR)\s(AND|OR)/.test(statement),
        errorMessage: "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN",
      },
      {
        validationHandler: (statement) =>
          !/(^(AND|OR))|((AND|OR)$)/.test(statement),
        errorMessage: "BOOLEAN_AGGREGATOR_WITHOUT_BOOLEAN",
      },
      {
        validationHandler: (statement) => {
          let openParenthesisWithoutClosingPartner = [];
          for (let char of statement) {
            if (char === "(") {
              openParenthesisWithoutClosingPartner.push(char);
            } else if (char === ")") {
              if (openParenthesisWithoutClosingPartner.length === 0) {
                return false;
              }
              openParenthesisWithoutClosingPartner.pop();
            }
          }
          return openParenthesisWithoutClosingPartner.length === 0;
        },
        errorMessage: "PARENTHESIS_MISMATCH",
      },
    ] satisfies SyntaxRuleProps[]
  ).map((syntaxRule) => new SyntaxRule(syntaxRule));
  static validate(stringifiedStatement: string) {
    this.#syntaxRules.map((syntaxRule) =>
      syntaxRule.validate(stringifiedStatement)
    );
  }
}
