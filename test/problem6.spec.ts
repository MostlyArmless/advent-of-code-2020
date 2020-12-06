import { expect } from "chai";
import { PROBLEM_6_INPUT } from "../data/problemInputs";
import { problem6_part1, problem6_part2 } from "../src/problem6";

describe( 'Problem 6', () =>
{
    const problem6SampleInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;
    it( 'Part 1 sample', () =>
    {
        expect( problem6_part1( problem6SampleInput ) ).to.equal( 11 );
    } );

    it( 'Part 1 final', () =>
    {
        expect( problem6_part1( PROBLEM_6_INPUT ) ).to.equal( 6532 );
    } );

    it( 'Part 2 sample', () =>
    {
        expect( problem6_part2( problem6SampleInput ) ).to.equal( 6 );
    } );
} );
