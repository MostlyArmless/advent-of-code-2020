import { Find2Sum } from "./TwoSum";

export function problem9_part1( input: string, preambleLength: number ): number
{
    const numbers = input.split( '\n' ).map( n => parseInt( n ) );
    const recentNumbers: number[] = []; // TODO - replace this array with a FIFO that doesn't copy memory around, just uses an internal index to keep track of which elements are 'recent'

    for ( let i = 0; i < numbers.length; i++ )
    {
        if ( recentNumbers.length >= preambleLength )
        {
            const { a, b } = Find2Sum( recentNumbers, numbers[i], true );
            if ( a === undefined && b === undefined )
                return numbers[i];
        }

        recentNumbers.unshift( numbers[i] );
        if ( recentNumbers.length > preambleLength )
            recentNumbers.pop();
    }

    return null; // Meaning all numbers in the sequence met the criterion
}