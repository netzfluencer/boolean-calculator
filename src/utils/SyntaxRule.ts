import {
  SyntaxRuleError,
  type SyntaxRuleErrorMessage,
} from "./SyntaxRuleError";

export type SyntaxRuleProps = {
  regex: RegExp;
  negated?: boolean;
  errorMessage: SyntaxRuleErrorMessage;
};
export class SyntaxRule {
  regex: RegExp;
  errorMessage: SyntaxRuleErrorMessage;
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
      throw new SyntaxRuleError(this.errorMessage);
    }
    return true;
  }
}
