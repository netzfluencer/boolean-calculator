import { SyntaxValidator } from "./utils/SyntaxValidator";

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
