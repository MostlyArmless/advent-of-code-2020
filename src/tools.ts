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