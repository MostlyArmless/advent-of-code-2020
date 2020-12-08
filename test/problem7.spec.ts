import { expect } from "chai";
import { PROBLEM_7_INPUT } from "../data/problem7Input";
import { problem7_part1, problem7_part2 } from "../src/problem7";

describe( 'Problem 7', () =>
{
    const problem7SampleInput1 = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

    it( 'Part 1 sample', () =>
    {
        const answer = problem7_part1( problem7SampleInput1, 'shiny gold' );
        expect( answer.validContainers.sort() ).to.deep.equal( ['bright white', 'muted yellow', 'dark orange', 'light red'].sort() );
        expect( answer.numberOfValidContainers ).to.equal( 4 );
    } );

    it( 'Part 1 final', () =>
    {
        expect( problem7_part1( PROBLEM_7_INPUT, 'shiny gold' ).numberOfValidContainers ).to.equal( 272 );
    } );

    it( 'Part 2 sample 1', () =>
    {
        // const expectedNestedChildren = [
        //     'dark olive',
        //     'vibrant plum',
        //     'vibrant plum',
        //     'faded blue',
        //     'faded blue',
        //     'faded blue',
        //     'dotted black',
        //     'dotted black',
        //     'dotted black',
        //     'dotted black',
        //     'faded blue',

        // ];
        const result = problem7_part2( problem7SampleInput1, 'shiny gold' );
        // expect( result.nestedChildren.length ).to.equal( result.numNestedChildren );
        // expect( result.nestedChildren.sort() ).to.deep.equal( expectedNestedChildren.sort() );
        expect( result ).to.equal( 32 );
    } );

    it( 'Part 2 sample 2', () =>
    {
        const sample2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

        expect( problem7_part2( sample2, 'shiny gold' ) ).to.equal( 126 );
    } );

    it( 'Part 2 final', () =>
    {
        expect( problem7_part2( PROBLEM_7_INPUT, 'shiny gold' ) ).to.equal( 172246 );
    } );
} );