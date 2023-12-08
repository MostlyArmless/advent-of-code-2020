import { ExecutionTimerResult, measureExecutionTime } from 'func-timer'
import { AdventOfCodeAnswer } from './interfaces';

const year = process.argv[2] ? parseInt(process.argv[2]) : 2020; // TODO change to 2021
const problemNumber = process.argv[3] ? parseInt(process.argv[3]) : 1;

async function main() {
    let timerResult: ExecutionTimerResult;
    const inputDataFile = `../data/${year}/problem${problemNumber}Input`;
    const problemFile = `./${year}/problem${problemNumber}`;
    console.log(`Importing data from ${inputDataFile}`);
    console.log(`Importing problem func from ${problemFile}`);
    const inputFileContents = await import(inputDataFile);
    const input = Object.values(inputFileContents);
    const problem = await import(problemFile);
    const numIterations = 10;

    for (const subProblemName in problem) {
        if (Object.prototype.hasOwnProperty.call(problem, subProblemName)) {
            if (!subProblemName.match(/^problem\d+_part\d+$/i)) {
                // This allows the problem files to export other functions for unit testing purposes,
                // but this problem runner will only run the actual problems themselves.
                continue;
            }
            const currentSubProblem = problem[subProblemName];
            timerResult = await measureExecutionTime(currentSubProblem, input, numIterations);
            const solution = timerResult.functionOutput as AdventOfCodeAnswer;
            console.log(`${currentSubProblem.name} results:\n${solution.description}:\n${solution.answer}`);
        }
    }
}

main();