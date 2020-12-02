import { PROBLEM_1_INPUT, PROBLEM_2_INPUT } from '../data/problemInputs';
import { problem1_part1, problem1_part2 } from './problem1';
import { measureExecutionTime, ExecutionTimerResult } from 'func-timer'
import { problem2_part1 } from './problem2';
import { LoggingLevel } from './interfaces';

async function main()
{
    console.log( `Running all problems...` );

    const a1_1: ExecutionTimerResult = await measureExecutionTime( problem1_part1, [PROBLEM_1_INPUT] );
    console.log( `problem1_part1 answer = ${a1_1.functionOutput}` );

    const a1_2: ExecutionTimerResult = await measureExecutionTime( problem1_part2, [PROBLEM_1_INPUT] );
    console.log( `problem1_part2 answer = ${a1_2.functionOutput}` );

    const a2_1: ExecutionTimerResult = await measureExecutionTime( problem2_part1, [PROBLEM_2_INPUT, LoggingLevel.Basic] );
    console.log( `problem2_part1 answer = ${a2_1.functionOutput}` );
}

main();