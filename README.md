# advent-of-code-2020

My solutions to the [Advent of Code 2020](https://adventofcode.com/2020) problems.

## Setup

1. Clone repo `git clone git@github.com:MostlyArmless/advent-of-code-2020.git`
2. Install dependencies `npm install`

## Usage

* `npm start` runs `/src/main.ts` which will solve each problem and print the solution, as well as the runtime.
* `npm start -- 4` runs only the solutions for problems 4 and above

## Tests

### Option 1 - CLI

`npm test` uses `ts-mocha` to run all the tests, and failures will be reported relative to the TypeScript source file(s)' line numbers, as opposed to the compiled javascript.
To run a specific test file you can pass the mocha `--grep` flag to run only matching tests. Note that it filters on test suite ('describe') and test case ('it') names, rather than filenames.

e.g. `npm test -- --grep 7` will run only the `Problem 7` test
e.g. `npm test -- --grep Problem` will run only the tests pertaining to the problems themselves, which excludes unit tests for any classes.

### Option 2 - Moch Test Explorer extension for VS Code

Install VS Code's [Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) extension so you can run test cases individually. `settings.json` is configured to look for files with the pattern `./test/*spec.ts`.
