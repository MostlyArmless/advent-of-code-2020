import { problem1_part1, problem1_part2 } from './problem1';
import { measureExecutionTime, IExecutionTimerResult } from 'func-timer'
import { IProblem2Result, problem2_part1, problem2_part2 } from './problem2';
import { IProblem3Part1Result, IProblem3Part2Result, problem3_part1, problem3_part2 } from './problem3';
import { problem4_part1, problem4_part2 } from './problem4';
import { problem5_part1, problem5_part2 } from './problem5';
import { problem6_part1, problem6_part2 } from './problem6';
import { PROBLEM_1_INPUT } from '../data/problem1Input';
import { PROBLEM_2_INPUT } from '../data/problem2Input';
import { PROBLEM_3_INPUT } from '../data/problem3Input';
import { PROBLEM_4_INPUT } from '../data/problem4Input';
import { PROBLEM_5_INPUT } from '../data/problem5Input';
import { PROBLEM_6_INPUT } from '../data/problem6Input';
import { PROBLEM_7_INPUT } from '../data/problem7Input';
import { IProblem7Part1Result, problem7_part1, problem7_part2 } from './problem7';

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

    if ( startingProblem <= 5 )
    {
        timerResult = await measureExecutionTime( problem5_part1, [PROBLEM_5_INPUT] );
        const p5p1: number = timerResult.functionOutput;
        console.log( `problem5_part1 answer = ${p5p1}\n` );

        timerResult = await measureExecutionTime( problem5_part2, [PROBLEM_5_INPUT] );
        const p5p2: number = timerResult.functionOutput;
        console.log( `problem5_part2 answer = ${p5p2}\n` );
    }

    if ( startingProblem <= 6 )
    {
        timerResult = await measureExecutionTime( problem6_part1, [PROBLEM_6_INPUT] );
        const p6p1: number = timerResult.functionOutput;
        console.log( `problem6_part1 answer = ${p6p1}\n` );

        timerResult = await measureExecutionTime( problem6_part2, [PROBLEM_6_INPUT] );
        const p6p2: number = timerResult.functionOutput;
        console.log( `problem6_part2 answer = ${p6p2}\n` );
    }

    if ( startingProblem <= 7 )
    {
        timerResult = await measureExecutionTime( problem7_part1, [PROBLEM_7_INPUT, 'shiny gold'] );
        const p7p1: IProblem7Part1Result = timerResult.functionOutput;
        console.log( `problem7_part1 answer = ${p7p1.numberOfValidContainers}\n` );

        timerResult = await measureExecutionTime( problem7_part2, [PROBLEM_7_INPUT, 'shiny gold'] );
        const p7p2: number = timerResult.functionOutput;
        console.log( `problem7_part2 answer = ${p7p2}\n` );
    }
}

main();