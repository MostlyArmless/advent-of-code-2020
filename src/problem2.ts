import { LoggingLevel } from "./interfaces";

interface IPassword
{
    min: number;
    max: number;
    targetLetter: string;
    password: string
}

export interface IProblem2Part1Result
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
export function problem2_part1( input: string, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem2Part1Result
{
    const lines = input.split( '\n' );
    let validPasswordIndices: boolean[] = [];

    const candidates: IPassword[] = convertLinesToPasswordCandidates( lines );

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

function convertLinesToPasswordCandidates( lines: string[] )
{
    const regex = /(\d+)-(\d+) (\w+): (\w+)/;
    const entries: IPassword[] = lines.map( line =>
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
