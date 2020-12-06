import * as fse from 'fs-extra'

// Run this script like "npm run add -- 7"
const problemNumber = parseInt( process.argv[2] );
if ( !problemNumber || problemNumber < 1 || problemNumber > 25 )
    throw new Error( `Invalid problem number: ${problemNumber}` );

const mainFileName = "./src/main.ts";
const solutionFileName = `./src/problem${problemNumber}.ts`;
const inputFileName = `./data/problem${problemNumber}Input.ts`;
const testFileName = `./test/problem${problemNumber}.spec.ts`;

if ( fse.existsSync( solutionFileName )
    || fse.existsSync( inputFileName )
    || fse.existsSync( testFileName )
)
    throw new Error( `ABORTING: At least one of the files already exists for problem ${problemNumber}` );

// Append contents to main.ts
const textToAppendToMain = `

    if (startingProblem <= ${problemNumber})
    {
        timerResult = await measureExecutionTime( problem${problemNumber}_part1, [PROBLEM_${problemNumber}_INPUT] );
        const p${problemNumber}p1: number = timerResult.functionOutput;
        console.log( \`problem6_part1 answer = \${ p${problemNumber}p1 }\\n\` );
    }
`;
let mainContents = fse.readFileSync( mainFileName ).toString();

const lines = mainContents.split( '\n' );
const updatedMainContents = lines.slice( 0, lines.length - 3 ).join( '\n' ) + textToAppendToMain + lines.slice( lines.length - 3, lines.length ).join( '\n' );
fse.writeFileSync( mainFileName, updatedMainContents );

// Create solution file
const solutionFileContents = `export function problem${problemNumber}_part1( input: string ): number
{

}

export function problem${problemNumber}_part2( input: string ): number
{

}`;
fse.writeFileSync( solutionFileName, solutionFileContents );

// Add input file
fse.writeFileSync( inputFileName, `export const PROBLEM_${problemNumber}_INPUT = \`\`;` );

// add test cases
const testFileContents = `import { expect } from "chai";
import { PROBLEM_${problemNumber}_INPUT } from "../data/problem${problemNumber}Input";
import { problem${problemNumber}_part1 } from "../src/problem${problemNumber}";

describe( 'Problem ${problemNumber}', () =>
{
    const problem${problemNumber}SampleInput = \`stuff\`;

    it( 'Part 1 sample', () =>
    {
        expect( problem${problemNumber}_part1( problem${problemNumber}SampleInput ) ).to.equal( 42 );
    } );

    it( 'Part 1 final', () =>
    {
        expect( problem${problemNumber}_part1( PROBLEM_${problemNumber}_INPUT ) ).to.equal( 42 );
    } );
} );`;
fse.writeFileSync( testFileName, testFileContents );