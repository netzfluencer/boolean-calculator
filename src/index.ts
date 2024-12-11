import { BooleanCalculatorSyntaxError } from "./utils/SyntaxError";

export class BooleanCalculator {
  static calculate(stringifiedStatement: string) {
    const purifiedStringifiedStatement = stringifiedStatement
      .toUpperCase()
      .replaceAll(" ", "");
    if (purifiedStringifiedStatement === "TRUE") return true;
    if (purifiedStringifiedStatement === "FALSE") return false;
    throw new BooleanCalculatorSyntaxError("STATEMENT_WITHOUT_BOOLEAN");
  }
}
