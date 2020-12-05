export function parseBoardingPass( boardingPass: string ): { row: number, column: number, seatId: number }
{
    const numRows = 128;
    const numCols = 8;

    let minRow = 0;
    let maxRow = numRows;
    let minCol = 0;
    let maxCol = numCols;
    boardingPass.split( '' ).forEach( letter =>
    {
        switch ( letter )
        {
            case 'F':
                // Take lower half
                maxRow = Math.floor( ( maxRow + minRow ) / 2 );
                break;
            case 'B':
                // Take the upper half
                minRow = Math.floor( ( maxRow + minRow ) / 2 );
                break;
            case 'L':
                // Take lower half
                maxCol = Math.floor( ( maxCol + minCol ) / 2 );
                break;
            case 'R':
                // Take upper half
                minCol = Math.floor( ( maxCol + minCol ) / 2 );
                break;
            default:
                throw new Error( "Invalid letter" );
        }
    } );

    return {
        row: minRow,
        column: minCol,
        seatId: minRow * 8 + minCol
    }
}

export function problem5_part1( input: string ): number
{
    const boardingPasses = input.split( '\n' );
    let maxSeatId = 0;
    boardingPasses.forEach( boardingPass =>
    {
        maxSeatId = Math.max( maxSeatId, parseBoardingPass( boardingPass ).seatId );
    } );

    return maxSeatId;
}

export function problem5_part2( input: string ): number
{
    let allSeatIds: number[] = [];
    let observedSeatIds = new Set<number>();

    for ( let iRow = 0; iRow < 127; iRow++ )
    {
        for ( let iCol = 0; iCol < 7; iCol++ )
        {
            allSeatIds.push( iRow * 8 + iCol );
        }
    }

    const boardingPasses = input.split( '\n' );
    boardingPasses.forEach( boardingPass =>
    {
        const seat = parseBoardingPass( boardingPass );
        observedSeatIds.add( seat.seatId );
    } );


    for ( let i = 0; i < allSeatIds.length; i++ )
    {
        const id = allSeatIds[i];
        if ( !observedSeatIds.has( id )
            && observedSeatIds.has( id - 1 )
            && observedSeatIds.has( id + 1 )
        )
            return id;
    }
}