import { expect } from "chai";
import { PROBLEM_9_INPUT } from "../../data/2020/problem9Input";
import { problem9_part1, problem9_part2 } from "../../src/2020/problem9";
import { shuffle } from "../../src/tools";

describe( 'Problem 9', () =>
{
    describe( 'Part 1 - preamble 25', () =>
    {
        let inputNumbers: number[] = [];
        let sampleInput: string = '';
        const preambleLength = 25;

        before( () =>
        {
            for ( let i = 1; i <= 25; i++ )
            {
                inputNumbers.push( i );
            }
        } );

        beforeEach( () =>
        {
            sampleInput = shuffle( inputNumbers ).join( '\n' );
        } );

        it( 'Part 1 sample 1', () =>
        {
            expect( problem9_part1( sampleInput + `\n${26}`, preambleLength ) ).to.be.null;
        } );

        it( 'Part 1 sample 2', () =>
        {
            expect( problem9_part1( sampleInput + `\n${49}`, preambleLength ) ).to.be.null;
        } );

        it( 'Part 1 sample 3', () =>
        {
            expect( problem9_part1( sampleInput + `\n${100}`, preambleLength ) ).to.equal( 100 );
        } );

        it( 'Part 1 sample 4', () =>
        {
            expect( problem9_part1( sampleInput + `\n${50}`, preambleLength ) ).to.equal( 50 );
        } );

        it( 'Part 1 final', () =>
        {
            expect( problem9_part1( PROBLEM_9_INPUT, 25 ) ).to.equal( 1492208709 );
        } );
    } );

    describe( 'Part 1 - preamble 5', () =>
    {
        const preambleLength = 5;
        const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;
        beforeEach( () =>
        {
            //Set up tests
        } );

        it( 'Sample 1', () =>
        {
            expect( problem9_part1( input, preambleLength ) ).to.equal( 127 );
        } );
    } );

    describe( 'Part 2', () =>
    {
        it( 'Sample', () =>
        {
            const sampleInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;
            expect( problem9_part2( sampleInput, 5 ) ).to.equal( 62 );
        } );
    } );
} );