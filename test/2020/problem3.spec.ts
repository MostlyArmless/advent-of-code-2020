import { expect } from "chai";
import { PROBLEM_3_INPUT } from "../../data/2020/problem3Input";
import { stringToGrid } from "../../src/Grid";
import { LoggingLevel } from "../../src/interfaces";
import { problem3_part1, problem3_part2 } from "../../src/2020/problem3";

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
