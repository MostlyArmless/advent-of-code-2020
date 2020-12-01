import { expect } from "chai";
import { problem1_part1, problem1_part2 } from '../src/problem1'
describe( 'AdventOfCode2020 Problems', () =>
{
    describe( 'Problem 1', () =>
    {
        const input = [1721, 979, 366, 299, 675, 1456];

        it( 'Part 1 sample', () =>
        {
            expect( problem1_part1( input ) ).to.equal( 514579 );
        } );

        it( 'Part 2 sample', () =>
        {
            expect( problem1_part2( input ) ).to.equal( 241861950 );
        } );
    } );
} );