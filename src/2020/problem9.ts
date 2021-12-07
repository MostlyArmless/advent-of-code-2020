import { Find2Sum } from "../TwoSum";

function findFirstNumInSequenceThatIsNotTheSumOf2RecentElements( numbers: number[], preambleLength: number ): number
{
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

export function problem9_part1( input: string, preambleLength: number ): number
{
    const numbers = input.split( '\n' ).map( n => parseInt( n ) );
    return findFirstNumInSequenceThatIsNotTheSumOf2RecentElements( numbers, preambleLength );
}

export function problem9_part2( input: string, preambleLength: number ): number
{
    const numbers = input.split( '\n' ).map( n => parseInt( n ) );
    const targetNumber = findFirstNumInSequenceThatIsNotTheSumOf2RecentElements( numbers, preambleLength );

    for ( let iAnchor = 0; iAnchor < numbers.length; iAnchor++ )
    {
        let sum = 0;
        let maxInRange = Number.MIN_SAFE_INTEGER;
        let minInRange = Number.MAX_SAFE_INTEGER;

        for ( let iCheck = iAnchor; iCheck < numbers.length; iCheck++ )
        {
            maxInRange = Math.max( maxInRange, numbers[iCheck] );
            minInRange = Math.min( minInRange, numbers[iCheck] );
            sum += numbers[iCheck];
            if ( sum > targetNumber )
                break;

            if ( sum === targetNumber )
                return maxInRange + minInRange;
        }
    }
}