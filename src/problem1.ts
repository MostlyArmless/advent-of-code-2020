export function problem1_part1( input: number[] ): number
{
    // Find which two numbers in the input list sum to '2020', and output their product
    for ( let i = 0; i < input.length; i++ )
    {
        const difference = 2020 - input[i];
        const otherNumber = input.find( a => { return a === difference } );
        if ( otherNumber !== undefined )
            return input[i] * otherNumber;
    }
}

export function problem1_part2( input: number[] ): number
{
    // Find {a,b,c} from elements in 'input' such that a+b+c = 2020. Return a*b*c.
    for ( let i = 0; i < input.length; i++ )
    {
        const a = input[i];
        for ( let j = 0; j < input.length; j++ )
        {
            if ( j === i )
                continue; // Must use 3 different numbers

            const b = input[j];
            for ( let k = 0; k < input.length; k++ )
            {
                if ( k === i || k === j )
                    continue; // Must use 3 different numbers

                const c = input[k];

                const sum = a + b + c;
                if ( sum === 2020 )
                    return a * b * c;

            }
        }
    }
}