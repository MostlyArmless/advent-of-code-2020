import { expect } from "chai";
import { PROBLEM_1_INPUT, PROBLEM_2_INPUT } from "../data/problemInputs";
import { LoggingLevel } from "../src/interfaces";
import { problem1_part1, problem1_part2 } from '../src/problem1'
import { IProblem2Result, problem2_part1, problem2_part2 } from "../src/problem2";

describe( 'AdventOfCode2020 Problems', () =>
{
    describe( 'Problem 1', () =>
    {
        const sampleInput: number[] = [1721, 979, 366, 299, 675, 1456];

        it( 'Part 1 sample', () =>
        {
            expect( problem1_part1( sampleInput ) ).to.equal( 514579 );
        } );

        it( 'Part 1 final', async () =>
        {
            expect( problem1_part1( PROBLEM_1_INPUT ) ).to.equal( 864864 );
        } );

        it( 'Part 2 sample', () =>
        {
            expect( problem1_part2( sampleInput ) ).to.equal( 241861950 );
        } );

        it( 'Part 2 final', async () =>
        {
            expect( problem1_part2( PROBLEM_1_INPUT ) ).to.equal( 281473080 );
        } );
    } );

    describe( 'Problem 2', () =>
    {
        const sampleInput: string = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

        it( 'Part 1 sample', () =>
        {
            const result: IProblem2Result = problem2_part1( sampleInput, LoggingLevel.Verbose );
            expect( result.numValidPasswords ).to.equal( 2 );
            expect( result.validPasswordIndices ).to.deep.equal( [true, false, true] );
        } );

        it( 'Part 1 final', () =>
        {
            const result: IProblem2Result = problem2_part1( PROBLEM_2_INPUT, LoggingLevel.Verbose );
            expect( result.numValidPasswords ).to.equal( 548 );
        } );

        it( 'Part 2 sample', () =>
        {
            const result: IProblem2Result = problem2_part2( sampleInput, LoggingLevel.Verbose );
            expect( result.numValidPasswords ).to.equal( 1 );
            expect( result.validPasswordIndices ).to.deep.equal( [true, false, false] );
        } );

        it( 'Part 2 final', () =>
        {
            const result: IProblem2Result = problem2_part2( PROBLEM_2_INPUT, LoggingLevel.Verbose );
            expect( result.numValidPasswords ).to.equal( 502 );
        } );
    } );
} );