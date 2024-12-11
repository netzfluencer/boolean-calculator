import { BooleanCalculatorSyntaxError } from "./utils/SyntaxError";
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
      const statement = negatedStatementMatch[1];
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

    if (!new RegExp("(TRUE|FALSE)").test(purifiedStringifiedStatement)) {
      throw new BooleanCalculatorSyntaxError("STATEMENT_WITHOUT_BOOLEAN");
    }

    if (
      !new RegExp(`^(TRUE|FALSE|NOT|AND)(\\s(TRUE|FALSE|NOT|AND))*$`).test(
        purifiedStringifiedStatement
      )
    ) {
      throw new BooleanCalculatorSyntaxError("STATEMENT_WITH_INVALID_OPERATOR");
    }

    if (new RegExp(`(NOT (AND|OR))|NOT$`).test(purifiedStringifiedStatement)) {
      throw new BooleanCalculatorSyntaxError(
        "STATEMENT_WITH_STANDALONE_NOT_OPERATOR"
      );
    }

    return this.#resolveStatement(purifiedStringifiedStatement);
  }
}
