import { expect } from "chai";
import { measureExecutionTime } from "func-timer";
import { PROBLEM_1_INPUT } from "../data/problem1Input";
import { problem1_part2_bruteForce, problem1_part2_map } from "../src/2020/problem1";

const numRepetitions = 50;

describe( 'Performance Comparisons', () =>
{
    it( 'Problem 1 Part 2 - Brute force VS map', async () =>
    {
        const r1 = await measureExecutionTime( problem1_part2_bruteForce, [PROBLEM_1_INPUT], numRepetitions );
        const r2 = await measureExecutionTime( problem1_part2_map, [PROBLEM_1_INPUT], numRepetitions );

        expect( r1.runtimeSeconds ).to.be.lte( 0.5 );
        expect( r2.runtimeSeconds ).to.be.lte( 0.5 );
        const fasterSlower = r1.runtimeSeconds < r2.runtimeSeconds ? "faster" : "slower";
        console.log( `problem1_part2_bruteForce is ${fasterSlower} than problem1_part2_map` );
    } );
} );