import { StatementResolver } from "./utils/StatementResolver";
import { SyntaxValidator } from "./utils/SyntaxValidator";

export class BooleanCalculator {
  static calculate(stringifiedStatement: string) {
    const purifiedStringifiedStatement = stringifiedStatement
      .replace(/\s+/g, " ")
      .replace(/\(\s+/g, "")
      .replace(/\s+\)/g, "")
      .trim()
      .toUpperCase();

    SyntaxValidator.validate(purifiedStringifiedStatement);

    return StatementResolver.resolve(purifiedStringifiedStatement);
  }
}
