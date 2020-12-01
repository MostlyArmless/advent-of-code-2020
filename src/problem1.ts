export function problem1( input: number[] ): number
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