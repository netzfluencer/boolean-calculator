import { BooleanCalculatorSyntaxError } from "./utils/SyntaxError";

const booleanRegExp = new RegExp("(TRUE|FALSE)");
const negationRegExp = new RegExp(`NOT ${booleanRegExp.source}`);
export class BooleanCalculator {
  static calculate(stringifiedStatement: string) {
    const purifiedStringifiedStatement = stringifiedStatement
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();

    if (!booleanRegExp.test(purifiedStringifiedStatement)) {
      throw new BooleanCalculatorSyntaxError("STATEMENT_WITHOUT_BOOLEAN");
    }

    const negatedStatementMatch =
      purifiedStringifiedStatement.match(negationRegExp);
    if (negatedStatementMatch) {
      const statement = negatedStatementMatch[1];
      if (statement === "TRUE") return false;
      if (statement === "FALSE") return true;
    }

    if (purifiedStringifiedStatement === "TRUE") return true;
    if (purifiedStringifiedStatement === "FALSE") return false;

    throw new BooleanCalculatorSyntaxError("STATEMENT_WITH_INVALID_OPERATOR");
  }
}
