export function XOR( a: boolean, b: boolean ): boolean
{
    return a ? !b : b;
}

export function getNumDigitsInNumber( N: number ): number
{
    if ( N === 0 )
        return 1;

    const nAbs = Math.abs( N );
    return Math.floor( Math.log10( nAbs ) ) + 1;
}

export function inRange( x: number, minInclusive: number, maxInclusive: number ): boolean
{
    return minInclusive <= x && x <= maxInclusive;
}

// Combine the contents of multiple existing sets into one, efficiently
export function concatSets<T>( setToConcatInto: Set<T>, ...otherSets ): void
{
    for ( const otherSet of otherSets )
    {
        for ( const element of otherSet )
        {
            setToConcatInto.add( element );
        }
    }
}