# Boolean Calculator (#booleanCalculator)

> Note: This one is hard.

> Create a boolean calculator that takes a boolean expression (as a string) and evaluates it to compute the correct output boolean result

Here are more details about what it should be able to do:

1. Single values

> "TRUE" -> true
> "FALSE" -> false

2. NOT operator

> "NOT TRUE" -> false

3. AND operator

> "TRUE AND FALSE" -> false
> "TRUE AND TRUE" -> true

4. OR operator

> "TRUE OR FALSE" -> true
> "FALSE OR FALSE" -> false

5. Combination of operators w/ precedence

It should allow you to provide any combination of the operators, but it should give precedence in this order:

- NOT
- AND
- OR

Here are some examples:

> "TRUE OR TRUE OR TRUE AND FALSE" -> true
> "TRUE OR FALSE AND NOT FALSE" -> true

6. Parenthesis

> "(TRUE OR TRUE OR TRUE) AND FALSE" -> false
> "NOT (TRUE AND TRUE)" -> false

## Getting started

To set up the project, run the following command:

```bash
npm run install
```

## To run the tests in development mode

To run the tests and have them reload when you save, run the following command:

```bash
npm run test:dev
```

## Find

DOINGS

- [] calculates boolean values based on a stringified representation
- [x] parses all characters of a string to uppercase
  1. "tRUE" => "TRUE"
- [x] ignores leading and trailing spaces
  1. " FALSE " => false
- [x] it cleans multiple spaces to just on space
  1. "NOT TRUE" => "NOT TRUE"
- [] validates string syntax

KNOWINGS

- [x] knows that "TRUE" is true
  1. "TRUE" => true
- [x] knows that "FALSE" is false
  1. "FALSE" => false
- [x] knows that the string has to contain at least 1x "TRUE" or "FALSE" statement
  1. "FALSE" => false
- [x] knows that a string without "TRUE" or "FALSE" statements is invalid
  1. "" => forbidden
- [x] knows that "NOT" negates the following statement
  1. "NOT FALSE" => true
  2. "NOT NOT FALSE" => false
- [x] knows that "NOT" can not stand alone
  1. "NOT" => forbidden
- [x] knows that "AND" is the and operator
  1. "AND" => &&
- [] knows that "OR" is the or operator
  1. "OR" => ||
- [] knows that multiple statements inside a string have to be combined by "AND" or "OR" operators
  1. "TRUE AND TRUE" => true
  2. "TRUE AND FALSE" => false
  3. "FALSE AND FALSE" => false
  4. "FALSE OR FALSE" => false
  5. "TRUE OR TRUE" => true
  6. "TRUE OR FALSE" => true
- [] knows that "TRUE"/"FALSE" can not be followed by another statement without "AND" or "OR"
  1. "TRUE FALSE" => forbidden
  2. "FALSE TRUE" => forbidden
  3. "FALSE (NOT TRUE)" => forbidden
- [] knows that 'AND'/'OR' can not be followed by 'AND/OR'
  1. 'FALSE AND AND FALSE' => forbidden
  2. 'TRUE OR AND FALSE' => forbidden
- [] knows that 'AND'/'OR' are always followed by a statement or the NOT operator
  1. "TRUE AND NOT FALSE" => true
- [] knows that calculating statements through operators follows an operational priority. First NOT operations are performed. Then AND. Then OR.
  1. "TRUE OR TRUE OR TRUE AND FALSE" -> true
  2. "TRUE OR FALSE AND NOT FALSE" -> true
- [] knows that each performed operation returns true or false
  1. "TRUE AND TRUE" => true
- [] knows that parenthesis wrap statements and operations that have to be calculated first and resolve true or false. The resolved value is used for the operations next to the parenthesis
  1. "(TRUE) OR FALSE" => true
  2. "FALSE OR (TRUE)" => true
  3. "(TRUE OR TRUE OR TRUE) AND FALSE" -> false
  4. "NOT (TRUE AND TRUE)" -> false
- [] knows that parenthesis wrappings start with "\(" and end with "\)"
  1. "(TRUE)" => true
- [] knows that "\("/"\)" can not standalone
  1. "((TRUE)" => forbidden
  2. "FALSE)" => forbidden
- [] knows that parenthesis can be wrapped by parenthesis
  1. ((TRUE)) => true
- [] knows that parenthesis has to contain at least 1x "TRUE" or "FALSE" statement or another pair of parenthesis
  1. "(FALSE)" => false
  2. "(((TRUE)))" => true
- [] knows that empty parenthesis are invalid
  1. "()" => forbidden
- [] knows that "NOT" negates the resolved parenthesis
  1. "NOT (TRUE AND TRUE)" -> false

## Arch

### BooleanCalculator

Input: string
Output: boolean
errors: SyntaxError (MISSING_PARENTHESIS, STATEMENT_WITH_STANDALONE_NOT_OPERATOR, STATEMENT_WITHOUT_BOOLEAN, PARENTHESIS_WITHOUT_STATEMENT, OPERAND_WITHOUT_STATEMENT, STATEMENT_WITH_INVALID_OPERATOR)

### Purificator

- purifies the input
  - parse all to uppercase
  - remove multiple spaces

### SyntaxValidator

- validates the syntax

### StatementExtractor

- translates the strings to **operations**

### StatementCalculator

- calculates the operations

### Testing Strategy

- validate input and output of the 4 units
  1. Purificator
  2. SyntaxValidator
  3. StatementExtractor
  4. StatementCalculator
