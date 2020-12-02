import { expect } from "chai";
import { PROBLEM_1_INPUT } from "../data/problemInputs";
import { problem1_part1, problem1_part2 } from '../src/problem1'
import { problem2_part1 } from "../src/problem2";

describe( 'AdventOfCode2020 Problems', () =>
{
    describe( 'Problem 1', () =>
    {
        const sampleInput: number[] = [1721, 979, 366, 299, 675, 1456];

        it( 'Part 1 sample', () =>
        {
            expect( problem1_part1( sampleInput ) ).to.equal( 514579 );
        } );

        it( 'Part 2 sample', () =>
        {
            expect( problem1_part2( sampleInput ) ).to.equal( 241861950 );
        } );

        it( 'Part 1 final', async () =>
        {
            expect( problem1_part1( PROBLEM_1_INPUT ) ).to.equal( 864864 );
        } );

        it( 'Part 2 final', async () =>
        {
            expect( problem1_part2( PROBLEM_1_INPUT ) ).to.equal( 281473080 );
        } );
    } );

    describe( 'Problem 2', () =>
    {
        const sampleInput = [];

        it( 'Part 1 sample', () =>
        {
            expect( problem2_part1( sampleInput ) ).to.equal( 'insertValHere' );
        } );
    } );
} );