import { PROBLEM_1_INPUT, PROBLEM_2_INPUT, PROBLEM_3_INPUT, PROBLEM_4_INPUT } from '../data/problemInputs';
import { problem1_part1, problem1_part2 } from './problem1';
import { measureExecutionTime, IExecutionTimerResult } from 'func-timer'
import { IProblem2Result, problem2_part1, problem2_part2 } from './problem2';
import { IProblem3Part1Result, IProblem3Part2Result, problem3_part1, problem3_part2 } from './problem3';
import { problem4_part1, problem4_part2 } from './problem4';

const startingProblem = process.argv[2] ? parseInt( process.argv[2] ) : 1;

async function main()
{
    let timerResult: IExecutionTimerResult;

    if ( startingProblem <= 1 )
    {
        timerResult = await measureExecutionTime( problem1_part1, [PROBLEM_1_INPUT] );
        console.log( `problem1_part1 answer = ${timerResult.functionOutput}\n` );

        timerResult = await measureExecutionTime( problem1_part2, [PROBLEM_1_INPUT] );
        console.log( `problem1_part2 answer = ${timerResult.functionOutput}\n` );

    }

    if ( startingProblem <= 2 )
    {
        timerResult = await measureExecutionTime( problem2_part1, [PROBLEM_2_INPUT] );
        const p2p1: IProblem2Result = timerResult.functionOutput;
        console.log( `problem2_part1 answer = ${p2p1.numValidPasswords}\n` );

        timerResult = await measureExecutionTime( problem2_part2, [PROBLEM_2_INPUT] );
        const p2p2: IProblem2Result = timerResult.functionOutput;
        console.log( `problem2_part2 answer = ${p2p2.numValidPasswords}\n` );
    }

    if ( startingProblem <= 3 )
    {
        timerResult = await measureExecutionTime( problem3_part1, [PROBLEM_3_INPUT] );
        const p3p1: IProblem3Part1Result = timerResult.functionOutput;
        console.log( `problem3_part1 answer = ${p3p1.numTreesEncountered}\n` );

        timerResult = await measureExecutionTime( problem3_part2, [PROBLEM_3_INPUT] );
        const p3p2: IProblem3Part2Result = timerResult.functionOutput;
        console.log( `problem3_part2 answer = ${p3p2.productOfAllNumTreesEncountered}\n` );
    }

    if ( startingProblem <= 4 )
    {
        timerResult = await measureExecutionTime( problem4_part1, [PROBLEM_4_INPUT] );
        const p4p1: number = timerResult.functionOutput;
        console.log( `problem4_part1 answer = ${p4p1}\n` );

        timerResult = await measureExecutionTime( problem4_part2, [PROBLEM_4_INPUT] );
        const p4p2: number = timerResult.functionOutput;
        console.log( `problem4_part2 answer = ${p4p2}\n` );
    }
}

main();