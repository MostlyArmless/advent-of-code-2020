export interface IDiffCount
{
    difference: number;
    count: number;
}

export interface IProblem10Part1Result
{
    highestRating: number;
    distribution: IDiffCount[];
}

type Difference = number;
type Quantity = number;
export function buildAdapterDifferenceMap( input: string ): Map<Difference, Quantity>
{
    const adapters: number[] = input
        .split( '\n' )
        .map( s => parseInt( s ) )
        .sort( ( a, b ) => a - b );

    const adapterDifferences = new Map<Difference, Quantity>();
    for ( let i = 0; i < adapters.length; i++ )
    {
        const diff = i === 0 ? adapters[i] : adapters[i] - adapters[i - 1];
        const quantity = adapterDifferences.has( diff ) ? adapterDifferences.get( diff ) + 1 : 1;
        adapterDifferences.set( diff, quantity );
    }
    // Set final difference to 3
    const quantity = adapterDifferences.has( 3 ) ? adapterDifferences.get( 3 ) + 1 : 1;
    adapterDifferences.set( 3, quantity );

    return adapterDifferences;
}

export function problem10_part1( input: string ): number
{
    const map = buildAdapterDifferenceMap( input );
    const numOneDiffs = map.get( 1 );
    const numThreeDiffs = map.get( 3 );
    return numOneDiffs * numThreeDiffs;
}