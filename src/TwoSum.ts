// Find 2 elements in a list which sum to a given targetSum. If no such elements exist, return undefined for both.
export function Find2Sum( input: number[], targetSum: number, mustBeUnique: boolean = false ): { a: number, b: number }
{
    for ( let i = 0; i < input.length; i++ )
    {
        const difference = targetSum - input[i];
        if ( mustBeUnique && difference === input[i] )
            continue;

        const otherNumber = input.find( a => { return a === difference } );
        if ( otherNumber !== undefined )
            return { a: input[i], b: otherNumber }
    }

    return { a: undefined, b: undefined };
}