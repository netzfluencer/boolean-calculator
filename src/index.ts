import {
  BooleanCalculatorSyntaxError,
  type BooleanCalculatorSyntaxErrorMessage,
} from "./utils/SyntaxError";

type SyntaxRuleProps = {
  regex: RegExp;
  negated?: boolean;
  errorMessage: BooleanCalculatorSyntaxErrorMessage;
};
class SyntaxRule {
  regex: RegExp;
  errorMessage: BooleanCalculatorSyntaxErrorMessage;
  negated: boolean;

  constructor({ regex, negated = false, errorMessage }: SyntaxRuleProps) {
    this.regex = regex;
    this.errorMessage = errorMessage;
    this.negated = negated;
  }

  validate(purifiedStringifiedStatement: string) {
    const result = this.regex.test(purifiedStringifiedStatement);
    const statementIsInvalid = this.negated ? !result : result;
    if (statementIsInvalid) {
      throw new BooleanCalculatorSyntaxError(this.errorMessage);
    }
    return true;
  }
}

class SyntaxValidator {
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

export class BooleanCalculator {
  static #resolveStatement(purifiedStringifiedStatement: string): boolean {
    const andStatementMatch = purifiedStringifiedStatement.match(
      new RegExp(`(\\S+)\\sAND\\s(\\S+)`)
    );
    if (andStatementMatch) {
      const [_, firstStatement, secondStatement] = andStatementMatch;
      return (
        this.#resolveStatement(firstStatement) &&
        this.#resolveStatement(secondStatement)
      );
    }

    const negatedStatementMatch = purifiedStringifiedStatement.match(
      new RegExp(`NOT ((?:NOT )*(TRUE|FALSE))`)
    );
    if (negatedStatementMatch) {
      const [_, statement] = negatedStatementMatch;
      return !this.#resolveStatement(statement);
    }

    if (purifiedStringifiedStatement === "TRUE") return true;
    return false;
  }
  static calculate(stringifiedStatement: string) {
    const purifiedStringifiedStatement = stringifiedStatement
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();

    SyntaxValidator.validate(purifiedStringifiedStatement);

    return this.#resolveStatement(purifiedStringifiedStatement);
  }
}
