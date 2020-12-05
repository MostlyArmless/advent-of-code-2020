import { expect } from "chai";
import { PROBLEM_1_INPUT, PROBLEM_2_INPUT, PROBLEM_3_INPUT, PROBLEM_4_INPUT, PROBLEM_5_INPUT } from "../data/problemInputs";
import { stringToGrid } from "../src/Grid";
import { LoggingLevel } from "../src/interfaces";
import { problem1_part1, problem1_part2 } from '../src/problem1'
import { IProblem2Result, problem2_part1, problem2_part2 } from "../src/problem2";
import { problem3_part1, problem3_part2 } from "../src/problem3";
import { problem4_part1, problem4_part2 } from "../src/problem4";
import { parseBoardingPass, problem5_part1, problem5_part2 } from "../src/problem5";

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

    describe( 'Problem 4', () =>
    {
        it( 'Part 1 sample', () =>
        {
            const problem4SampleInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

            expect( problem4_part1( problem4SampleInput ) ).to.equal( 2 );
        } );

        it( 'Part 1 final', () =>
        {
            const numValidPassports = problem4_part1( PROBLEM_4_INPUT )
            expect( numValidPassports ).to.be.equal( 264 );
        } );

        it( 'Part 2 sample invalid passports', () =>
        {
            const invalids = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

            expect( problem4_part2( invalids ) ).to.equal( 0 );
        } );

        it( 'Part 2 sample valid passports', () =>
        {
            const valids = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

            expect( problem4_part2( valids ) ).to.equal( 4 );
        } );

        it( 'Part 2 final', () =>
        {
            expect( problem4_part2( PROBLEM_4_INPUT ) ).to.equal( 224 );
        } );
    } );

    describe( 'Problem 5', () =>
    {
        it( 'Part 1 sample 1', () =>
        {
            expect( parseBoardingPass( 'FBFBBFFRLR' ) ).to.deep.equal( { row: 44, column: 5, seatId: 357 } );
        } );

        it( 'Part 1 sample 2', () =>
        {
            expect( parseBoardingPass( 'BFFFBBFRRR' ) ).to.deep.equal( { row: 70, column: 7, seatId: 567 } );
        } );

        it( 'Part 1 sample 3', () =>
        {
            expect( parseBoardingPass( 'FFFBBBFRRR' ) ).to.deep.equal( { row: 14, column: 7, seatId: 119 } );
        } );

        it( 'Part 1 sample 4', () =>
        {
            expect( parseBoardingPass( 'BBFFBBFRLL' ) ).to.deep.equal( { row: 102, column: 4, seatId: 820 } );
        } );

        it( 'Part 1 final', () =>
        {
            expect( problem5_part1( PROBLEM_5_INPUT ) ).to.equal( 878 );
        } );

        it( 'Part 2 final', () =>
        {
            expect( problem5_part2( PROBLEM_5_INPUT ) ).to.equal( 504 );
        } );
    } );
} );