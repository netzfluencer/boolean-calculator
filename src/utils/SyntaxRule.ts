import {
  SyntaxRuleError,
  type SyntaxRuleErrorMessage,
} from "./SyntaxRuleError";

export type SyntaxRuleProps = {
  validationHandler: (statement: string) => boolean;
  errorMessage: SyntaxRuleErrorMessage;
};
export class SyntaxRule {
  validationHandler: SyntaxRuleProps["validationHandler"];
  errorMessage: SyntaxRuleProps["errorMessage"];

  constructor({ validationHandler, errorMessage }: SyntaxRuleProps) {
    this.validationHandler = validationHandler;
    this.errorMessage = errorMessage;
  }

  validate(purifiedStringifiedStatement: string) {
    const isValidStatement = this.validationHandler(
      purifiedStringifiedStatement
    );
    if (!isValidStatement) {
      throw new SyntaxRuleError(this.errorMessage);
    }
    return true;
  }
}
