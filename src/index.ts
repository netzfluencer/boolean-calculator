import { BooleanCalculatorSyntaxError } from "./utils/SyntaxError";

const booleanRegExp = new RegExp("(TRUE|FALSE)");
const negationRegExp = new RegExp(`NOT ((?:NOT )*${booleanRegExp.source})`);
export class BooleanCalculator {
  static #resolveStatement(purifiedStringifiedStatement: string): boolean {
    const negatedStatementMatch =
      purifiedStringifiedStatement.match(negationRegExp);
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

    if (!booleanRegExp.test(purifiedStringifiedStatement)) {
      throw new BooleanCalculatorSyntaxError("STATEMENT_WITHOUT_BOOLEAN");
    }

    if (
      !new RegExp(`^(TRUE|FALSE|NOT)(\\s(TRUE|FALSE|NOT))*$`).test(
        purifiedStringifiedStatement
      )
    ) {
      throw new BooleanCalculatorSyntaxError("STATEMENT_WITH_INVALID_OPERATOR");
    }

    return this.#resolveStatement(purifiedStringifiedStatement);
  }
}
