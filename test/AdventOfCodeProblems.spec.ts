import { expect } from "chai";
import { problem1 } from '../src/problem1'
describe( 'AdventOfCode2020 Problems', () =>
{
    it( 'Problem 1a - Sample', () =>
    {
        const input = [1721, 979, 366, 299, 675, 1456];
        expect( problem1( input ) ).to.equal( 514579 );
    } );
} );