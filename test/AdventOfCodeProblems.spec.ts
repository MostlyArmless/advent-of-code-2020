import { expect } from "chai";
import { PROBLEM_1_INPUT, PROBLEM_2_INPUT, PROBLEM_3_INPUT } from "../data/problemInputs";
import { stringToGrid } from "../src/Grid";
import { LoggingLevel } from "../src/interfaces";
import { problem1_part1, problem1_part2 } from '../src/problem1'
import { IProblem2Result, problem2_part1, problem2_part2 } from "../src/problem2";
import { problem3_part1, problem3_part2 } from "../src/problem3";

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

    describe( 'Problem 3', () =>
    {
        const problem3SampleInput: string = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

        it( 'Grid tiling', () =>
        {
            const thriceHorizontallyTiledProblem3Input = `..##.........##.........##.......
#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#`;

            const grid = stringToGrid( problem3SampleInput, 3 );
            const tiledGridString = grid.toString( false, false, false );
            console.log( `ACTUAL:\n${tiledGridString}\n\n` );
            console.log( `EXPECTED:\n${thriceHorizontallyTiledProblem3Input}` );
            expect( tiledGridString ).to.equal( thriceHorizontallyTiledProblem3Input );
        } );

        it( 'Grid orientation', () =>
        {
            const grid = stringToGrid( problem3SampleInput, 3 );
            expect( grid.get( 0, 0 ) ).to.equal( '.' ); // Top left corner
            expect( grid.get( 10, 0 ) ).to.equal( '.' ); // Bottom left corner
            expect( grid.get( 0, 10 ) ).to.equal( '.' ); // Top right corner
            expect( grid.get( 10, 10 ) ).to.equal( '#' ); // Top right corner
        } );

        it( 'Part 1 sample', () =>
        {
            const expectedFinalHillString = `..##.........##.........##.........##.........##.........##.......
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#`;
            const numTilings = 6;
            const { numTreesEncountered, finalHillString } = problem3_part1( problem3SampleInput, numTilings, LoggingLevel.Verbose );

            expect( numTreesEncountered ).to.equal( 7 );
            expect( finalHillString ).to.equal( expectedFinalHillString );
        } );

        it( 'Part 1 final', () =>
        {
            const numTreesEncountered = problem3_part1( PROBLEM_3_INPUT ).numTreesEncountered;
            expect( numTreesEncountered ).to.equal( 214 );
        } );

        it( 'Part 2 sample', () =>
        {
            const result = problem3_part2( problem3SampleInput );
            expect( result.numTreesPerScenario ).to.deep.equal( [2, 7, 3, 4, 2] );
            expect( result.productOfAllNumTreesEncountered ).to.equal( 336 );
        } );

        it( 'Part 2 final', () =>
        {
            const result = problem3_part2( PROBLEM_3_INPUT );
            expect( result.productOfAllNumTreesEncountered ).to.equal( 8336352024 );
        } );
    } );
} );