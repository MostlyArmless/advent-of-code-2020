import { LoggingLevel } from "./interfaces";
import { XOR } from "./tools";

interface IPasswordPolicy1
{
    min: number;
    max: number;
    targetLetter: string;
    password: string
}

interface IPasswordPolicy2
{
    position1: number;
    position2: number;
    targetLetter: string;
    password: string;
}

export interface IProblem2Result
{
    numValidPasswords: number;
    validPasswordIndices: boolean[];
}

// Expecting input to be a multi-line string of the following form:
/*
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
*/
export function problem2_part1( input: string, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem2Result
{
    const lines = input.split( '\n' );
    let validPasswordIndices: boolean[] = [];
    const candidates: IPasswordPolicy1[] = convertLinesToPasswordCandidates1( lines );

    let numValidPasswords = 0;
    let iEntry = 0;
    candidates.forEach( candidate =>
    {
        iEntry++;
        const numTargetLetterAppearances = candidate.password
            .split( '' )
            .filter( letter => letter === candidate.targetLetter )
            .length;

        if ( numTargetLetterAppearances >= candidate.min && numTargetLetterAppearances <= candidate.max )
        {
            numValidPasswords++;
            validPasswordIndices.push( true );
            if ( loggingLevel === LoggingLevel.Verbose )
                console.log( `Password #${iEntry} '${candidate.password}' is VALID` );
        }
        else
        {
            validPasswordIndices.push( false );
            if ( loggingLevel === LoggingLevel.Verbose )
                console.log( `Password #${iEntry} '${candidate.password}' is NOT valid because the letter ${candidate.targetLetter} should appear ${candidate.min}-${candidate.max} times, but actually appears ${numTargetLetterAppearances} times` );
        }
    } );

    if ( loggingLevel >= LoggingLevel.Basic )
        console.log( `numValidPasswords = ${numValidPasswords} (out of ${validPasswordIndices.length})` );
    return { numValidPasswords, validPasswordIndices };
}

export function problem2_part2( input: string, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem2Result
{
    const lines = input.split( '\n' );
    let validPasswordIndices: boolean[] = [];
    let numValidPasswords = 0;
    const candidates: IPasswordPolicy2[] = convertLinesToPasswordCandidates2( lines );

    let iEntry = 0;
    candidates.forEach( candidate =>
    {
        iEntry++;
        if ( XOR( candidate.password[candidate.position1 - 1] === candidate.targetLetter,
            candidate.password[candidate.position2 - 1] === candidate.targetLetter ) )
        {
            numValidPasswords++;
            validPasswordIndices.push( true );
            if ( loggingLevel === LoggingLevel.Verbose )
                console.log( `Password #${iEntry} '${candidate.password}' is VALID` );
        }
        else
        {
            validPasswordIndices.push( false );
            if ( loggingLevel === LoggingLevel.Verbose )
                console.log( `Password #${iEntry} '${candidate.password}' is NOT valid because the letter ${candidate.targetLetter} should appear in exactly ONE of the two 1-based positions ${candidate.position1} XOR ${candidate.position2}` );
        }
    } );

    return { numValidPasswords, validPasswordIndices };
}

// Shared regex
const regex = /(\d+)-(\d+) (\w+): (\w+)/;

function convertLinesToPasswordCandidates1( lines: string[] ): IPasswordPolicy1[]
{
    const entries: IPasswordPolicy1[] = lines.map( line =>
    {
        const matches = regex.exec( line );
        return {
            min: parseInt( matches[1] ),
            max: parseInt( matches[2] ),
            targetLetter: matches[3],
            password: matches[4]
        };
    } );
    return entries;
}

function convertLinesToPasswordCandidates2( lines: string[] ): IPasswordPolicy2[]
{
    const entries: IPasswordPolicy2[] = lines.map( line =>
    {
        const matches = regex.exec( line );
        return {
            position1: parseInt( matches[1] ),
            position2: parseInt( matches[2] ),
            targetLetter: matches[3],
            password: matches[4]
        };
    } );
    return entries;
}