export class BooleanCalculator {
  static calculate(stringifiedStatement: string) {
    if (stringifiedStatement === "TRUE") return true;
    if (stringifiedStatement === "FALSE") return false;
  }
}
