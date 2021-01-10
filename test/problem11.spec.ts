import { expect } from "chai";
import { PROBLEM_11_INPUT } from "../data/problem11Input";
import { problem11_part1 } from "../src/problem11";

describe( 'Problem 11', () =>
{
    const problem11SampleInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

    it( 'Part 1 sample', () =>
    {
        expect( problem11_part1( problem11SampleInput ) ).to.equal( 37 );
    } );

    it( 'Part 1 final', () =>
    {
        expect( problem11_part1( PROBLEM_11_INPUT ) ).to.equal( 2354 );
    } );
} );