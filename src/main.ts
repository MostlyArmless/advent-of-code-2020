import { PROBLEM_1_INPUT } from '../data/problemInputs';
import { problem1_part1, problem1_part2 } from './problem1';
import { measureExecutionTime, ExecutionTimerResult } from 'func-timer'

async function main()
{
    console.log( `Running all problems...` );

    const a1_1: ExecutionTimerResult = await measureExecutionTime( problem1_part1, [PROBLEM_1_INPUT] );
    console.log( `Problem 1 part 1 answer = ${a1_1.functionOutput}` );

    const a1_2: ExecutionTimerResult = await measureExecutionTime( problem1_part2, [PROBLEM_1_INPUT] );
    console.log( `Problem 1 part 2 answer = ${a1_2.functionOutput}` );
}

main();