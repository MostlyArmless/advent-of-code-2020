import { AdventOfCodeAnswer, LoggingLevel } from "../interfaces";
import { XOR } from "../tools";

interface IPasswordCandidate
{
    a: number;
    b: number;
    targetLetter: string;
    password: string
}

type PasswordPolicy = ( candidate: IPasswordCandidate ) => boolean;

export interface IProblem2Result
{
    numValidPasswords: number;
    validPasswordIndices: boolean[];
}

function validatePasswords( candidates: IPasswordCandidate[], policy: PasswordPolicy ): IProblem2Result
{
    let result: IProblem2Result = {
        numValidPasswords: 0,
        validPasswordIndices: []
    }

    candidates.forEach( candidate =>
    {
        if ( policy( candidate ) )
        {
            result.numValidPasswords++;
            result.validPasswordIndices.push( true );
        }
        else
        {
            result.validPasswordIndices.push( false );
        }
    } );

    return result;
}

const policy1: PasswordPolicy = ( candidate: IPasswordCandidate ): boolean =>
{
    // The target letter must appear no fewer than 'a' times and no more than 'b' times
    const numTargetLetterAppearances = candidate.password
        .split( '' )
        .filter( letter => letter === candidate.targetLetter )
        .length;

    return numTargetLetterAppearances >= candidate.a
        && numTargetLetterAppearances <= candidate.b;
}

const policy2: PasswordPolicy = ( candidate: IPasswordCandidate ): boolean =>
{
    // The target letter must appear in EXACTLY one of the two 1-based indices, either 'a' or 'b'.
    return XOR( candidate.password[candidate.a - 1] === candidate.targetLetter,
        candidate.password[candidate.b - 1] === candidate.targetLetter );
}

export function problem2_part1_internal(input: string, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem2Result
{
    const candidates: IPasswordCandidate[] = convertInputToCandidates( input );
    return validatePasswords( candidates, policy1 );
}

export function problem2_part1( input: string ): AdventOfCodeAnswer
{
    const result = problem2_part1_internal(input);
    return {
        answer: result.numValidPasswords.toString(),
        description: 'Number of valid password according to policy1'
    };
}

export function problem2_part2_internal( input: string, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem2Result
{
    const candidates: IPasswordCandidate[] = convertInputToCandidates( input );
    return validatePasswords( candidates, policy2 );
}

export function problem2_part2( input: string ): AdventOfCodeAnswer
{
    const result = problem2_part2_internal(input);
    return {
        answer: result.numValidPasswords.toString(),
        description: 'Number of valid passwords according to policy2'
    };
}

const regex = /(\d+)-(\d+) (\w): (\w+)/;
function convertInputToCandidates( problem2Input: string ): IPasswordCandidate[]
{
    const candidates: IPasswordCandidate[] = problem2Input
        .split( '\n' )
        .map( line =>
        {
            const matches = regex.exec( line );
            return {
                a: parseInt( matches[1] ),
                b: parseInt( matches[2] ),
                targetLetter: matches[3],
                password: matches[4]
            };
        } );

    return candidates;
}