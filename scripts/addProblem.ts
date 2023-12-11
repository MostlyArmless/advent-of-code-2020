import * as fse from 'fs-extra'

// Run this script like "npm run add -- 2023 6"
const year = parseInt(process.argv[2]);
const problemNumber = parseInt(process.argv[3]);

if (!problemNumber || problemNumber < 1 || problemNumber > 25)
    throw new Error(`Invalid problem number: ${problemNumber}`);

if (![2020, 2021, 2023].includes(year))
    throw new Error(`Invalid year: ${year}`);

const solutionFileName = `./src/${year}/problem${problemNumber}.ts`;
const inputFileName = `./data//${year}/problem${problemNumber}Input.ts`;
const testFileName = `./test/${year}/problem${problemNumber}.spec.ts`;

if (fse.existsSync(solutionFileName)
    || fse.existsSync(inputFileName)
    || fse.existsSync(testFileName)
)
    throw new Error(`ABORTING: At least one of the files already exists for problem ${problemNumber}`);

// Create solution file
const solutionFileContents = `export function problem${problemNumber}_part1( input: string ): number
{
    return 0;
}

export function problem${problemNumber}_part2( input: string ): number
{
    return 0;
}`;
fse.writeFileSync(solutionFileName, solutionFileContents);

// Add input file
fse.writeFileSync(inputFileName, `export const PROBLEM_${problemNumber}_INPUT = \`\`;`);

// add test cases
const testFileContents = `
import { PROBLEM_${problemNumber}_INPUT } from "../../data/${year}/problem${problemNumber}Input";
import { problem${problemNumber}_part1, problem${problemNumber}_part2 } from "../../src/${year}/problem${problemNumber}";

describe( 'Problem ${problemNumber}', () =>
{
    const problem${problemNumber}SampleInput = \`stuff\`;

    it( 'Part 1 sample', () =>
    {
        expect( problem${problemNumber}_part1( problem${problemNumber}SampleInput ) ).toEqual( 42 );
    } );

    it( 'Part 1 final', () =>
    {
        expect( problem${problemNumber}_part1( PROBLEM_${problemNumber}_INPUT ) ).toEqual( 42 );
    } );

    it( 'Part 2 sample', () =>
    {
        expect( problem${problemNumber}_part2( problem${problemNumber}SampleInput ) ).toEqual( 42 );
    } );

    it( 'Part 2 final', () =>
    {
        expect( problem${problemNumber}_part2( PROBLEM_${problemNumber}_INPUT ) ).toEqual( 42 );
    } );
} );`;
fse.writeFileSync(testFileName, testFileContents);