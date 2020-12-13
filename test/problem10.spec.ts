import { expect } from "chai";
import { PROBLEM_10_INPUT } from "../data/problem10Input";
import { buildAdapterDifferenceMap, problem10_part1 } from "../src/problem10";

describe( 'Problem 10', () =>
{
    const problem10SampleInput1 = `16
10
15
5
1
11
7
19
6
12
4`;

    const problem10SampleInput2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

    it( 'buildAdapterDifferenceMap sample 1', () =>
    {
        const map = buildAdapterDifferenceMap( problem10SampleInput1 );
        expect( map.get( 1 ) ).to.equal( 7 );
        expect( map.get( 3 ) ).to.equal( 5 );
    } );

    it( 'Part 1 sample 1', () =>
    {
        expect( problem10_part1( problem10SampleInput1 ) ).to.equal( 35 );
    } );

    it( 'Part 1 sample 2', () =>
    {
        expect( problem10_part1( problem10SampleInput2 ) ).to.equal( 220 );
    } );

    it( 'Part 1 final', () =>
    {
        expect( problem10_part1( PROBLEM_10_INPUT ) ).to.equal( 2263 );
    } );
} );