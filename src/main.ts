import { ExecutionTimerResult, measureExecutionTime } from 'func-timer'
import { PROBLEM_3_INPUT } from '../data/2020/problem3Input';
import { IProblem3Part1Result, IProblem3Part2Result, problem3_part1, problem3_part2 } from './2020/problem3';
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

    // console.log(`OLD METHOD:`);

    // // Problem 1
    // timerResult = await measureExecutionTime( problem1_part1, [PROBLEM_1_INPUT], numIterations );
    // console.log( `problem1_part1 answer = ${timerResult.functionOutput}\n` );

    // timerResult = await measureExecutionTime( problem1_part2, [PROBLEM_1_INPUT], numIterations );
    // console.log( `problem1_part2 answer = ${timerResult.functionOutput}\n` );

    // // Problem 2
    // timerResult = await measureExecutionTime( problem2_part1, [PROBLEM_2_INPUT] );
    // const p2p1: IProblem2Result = timerResult.functionOutput;
    // console.log( `problem2_part1 answer = ${p2p1.numValidPasswords}\n` );

    // timerResult = await measureExecutionTime( problem2_part2, [PROBLEM_2_INPUT] );
    // const p2p2: IProblem2Result = timerResult.functionOutput;
    // console.log( `problem2_part2 answer = ${p2p2.numValidPasswords}\n` );

    timerResult = await measureExecutionTime(problem3_part1, [PROBLEM_3_INPUT]);
    const p3p1: IProblem3Part1Result = timerResult.functionOutput;
    console.log(`problem3_part1 answer = ${p3p1.numTreesEncountered}\n`);

    timerResult = await measureExecutionTime(problem3_part2, [PROBLEM_3_INPUT]);
    const p3p2: IProblem3Part2Result = timerResult.functionOutput;
    console.log(`problem3_part2 answer = ${p3p2.productOfAllNumTreesEncountered}\n`);

    // if ( startingProblem <= 4 )
    // {
    //     timerResult = await measureExecutionTime( problem4_part1, [PROBLEM_4_INPUT] );
    //     const p4p1: number = timerResult.functionOutput;
    //     console.log( `problem4_part1 answer = ${p4p1}\n` );

    //     timerResult = await measureExecutionTime( problem4_part2, [PROBLEM_4_INPUT] );
    //     const p4p2: number = timerResult.functionOutput;
    //     console.log( `problem4_part2 answer = ${p4p2}\n` );
    // }

    // if ( startingProblem <= 5 )
    // {
    //     timerResult = await measureExecutionTime( problem5_part1, [PROBLEM_5_INPUT] );
    //     const p5p1: number = timerResult.functionOutput;
    //     console.log( `problem5_part1 answer = ${p5p1}\n` );

    //     timerResult = await measureExecutionTime( problem5_part2, [PROBLEM_5_INPUT] );
    //     const p5p2: number = timerResult.functionOutput;
    //     console.log( `problem5_part2 answer = ${p5p2}\n` );
    // }

    // if ( startingProblem <= 6 )
    // {
    //     timerResult = await measureExecutionTime( problem6_part1, [PROBLEM_6_INPUT] );
    //     const p6p1: number = timerResult.functionOutput;
    //     console.log( `problem6_part1 answer = ${p6p1}\n` );

    //     timerResult = await measureExecutionTime( problem6_part2, [PROBLEM_6_INPUT] );
    //     const p6p2: number = timerResult.functionOutput;
    //     console.log( `problem6_part2 answer = ${p6p2}\n` );
    // }

    // if ( startingProblem <= 7 )
    // {
    //     timerResult = await measureExecutionTime( problem7_part1, [PROBLEM_7_INPUT, 'shiny gold'] );
    //     const p7p1: IProblem7Part1Result = timerResult.functionOutput;
    //     console.log( `problem7_part1 answer = ${p7p1.numberOfValidContainers}\n` );

    //     timerResult = await measureExecutionTime( problem7_part2, [PROBLEM_7_INPUT, 'shiny gold'] );
    //     const p7p2: number = timerResult.functionOutput;
    //     console.log( `problem7_part2 answer = ${p7p2}\n` );
    // }

    // if ( startingProblem <= 8 )
    // {
    //     timerResult = await measureExecutionTime( problem8_part1, [PROBLEM_8_INPUT] );
    //     const p8p1: number = timerResult.functionOutput;
    //     console.log( `problem8_part1 answer = ${p8p1}\n` );

    //     timerResult = await measureExecutionTime( problem8_part2, [PROBLEM_8_INPUT] );
    //     const p8p2: number = timerResult.functionOutput;
    //     console.log( `problem8_part2 answer = ${p8p2}\n` );
    // }

    // if ( startingProblem <= 9 )
    // {
    //     timerResult = await measureExecutionTime( problem9_part1, [PROBLEM_9_INPUT, 25] );
    //     const p9p1: number = timerResult.functionOutput;
    //     console.log( `problem9_part1 answer = ${p9p1}\n` );

    //     timerResult = await measureExecutionTime( problem9_part2, [PROBLEM_9_INPUT, 25] );
    //     const p9p2: number = timerResult.functionOutput;
    //     console.log( `problem9_part2 answer = ${p9p2}\n` );
    // }

    // if ( startingProblem <= 10 )
    // {
    //     timerResult = await measureExecutionTime( problem10_part1, [PROBLEM_10_INPUT] );
    //     const p10p1: number = timerResult.functionOutput;
    //     console.log( `problem10_part1 answer = ${p10p1}\n` );
    // }

    // if ( startingProblem <= 11 )
    // {
    //     timerResult = await measureExecutionTime( problem11_part1, [PROBLEM_11_INPUT] );
    //     const p11p1: number = timerResult.functionOutput;
    //     console.log( `problem11_part1 answer = ${p11p1}\n` );

    //     timerResult = await measureExecutionTime( problem11_part2, [PROBLEM_11_INPUT] );
    //     const p11p2: number = timerResult.functionOutput;
    //     console.log( `problem11_part1 answer = ${p11p2}\n` );
    // }

}

main();