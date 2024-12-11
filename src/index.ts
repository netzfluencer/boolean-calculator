import { BooleanCalculatorSyntaxError } from "./utils/SyntaxError";

export class BooleanCalculator {
  static calculate(stringifiedStatement: string) {
    if (stringifiedStatement === "TRUE") return true;
    if (stringifiedStatement === "FALSE") return false;
    throw new BooleanCalculatorSyntaxError("STATEMENT_WITHOUT_BOOLEAN");
  }
}
