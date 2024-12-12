export class StatementResolver {
  static #semanticHandlers = new Map<
    RegExp,
    (match: RegExpMatchArray) => boolean
  >([
    [
      /(.*)\(([^()]+)\)(.*)/,
      (parenthesisMatch) => {
        const [_, leftStatement, innerStatement, rightStatement] =
          parenthesisMatch;
        const resolvedInnerStatement = this.resolve(innerStatement);
        return this.resolve(
          [
            leftStatement,
            String(resolvedInnerStatement).toUpperCase(),
            rightStatement,
          ].join("")
        );
      },
    ],
    [
      /(.+)\sOR\s(.+)/,
      (orMatch) => {
        const [_, firstStatement, secondStatement] = orMatch;
        return this.resolve(firstStatement) || this.resolve(secondStatement);
      },
    ],
    [
      /(.+)\sAND\s(.+)/,
      (andMatch) => {
        const [_, firstStatement, secondStatement] = andMatch;
        return this.resolve(firstStatement) && this.resolve(secondStatement);
      },
    ],
    [
      /NOT ((?:NOT )*(TRUE|FALSE))/,
      (negationMatch) => {
        const [_, statement] = negationMatch;
        return !this.resolve(statement);
      },
    ],
    [/^TRUE$/, () => true],
    [/^FALSE$/, () => false],
  ]);
  static resolve(purifiedStringifiedStatement: string): boolean {
    for (const [regex, handler] of this.#semanticHandlers) {
      const match = purifiedStringifiedStatement.match(regex);
      if (match) {
        return handler(match);
      }
    }

    throw new Error(
      `Error: Can not resolve "${purifiedStringifiedStatement}".`
    );
  }
}
