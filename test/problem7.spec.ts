import { expect } from "chai";
import { PROBLEM_7_INPUT } from "../data/problem7Input";
import { problem7_part1 } from "../src/problem7";

describe( 'Problem 7', () =>
{
    const problem7SampleInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
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
        const answer = problem7_part1( problem7SampleInput, 'shiny gold' );
        expect( answer.validContainers.sort() ).to.deep.equal( ['bright white', 'muted yellow', 'dark orange', 'light red'].sort() );
        expect( answer.numberOfValidContainers ).to.equal( 4 );
    } );

    it( 'Part 1 final', () =>
    {
        expect( problem7_part1( PROBLEM_7_INPUT, 'shiny gold' ) ).to.equal( 272 );
    } );
} );