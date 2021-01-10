import { Grid, stringToGrid } from "./Grid";
import { LoggingLevel } from "./interfaces";

enum SeatState
{
    Empty = 'L',
    Occupied = '#',
    Floor = '.'
}

function calculateNewSeatState( currentSeatState: SeatState, numOccupiedAdjacentSeats: number ): SeatState
{
    if ( currentSeatState === SeatState.Empty && numOccupiedAdjacentSeats === 0 )
        return SeatState.Occupied
    else if ( currentSeatState === SeatState.Occupied && numOccupiedAdjacentSeats >= 4 )
        return SeatState.Empty;
    else
        return currentSeatState;
}

function calculateNumOccupiedAdjacentSeats( seatGrid: Grid<string>, iRow: number, iCol: number ): number
{
    let numOccupiedAdjacentSeats = 0;
    for ( let r = iRow - 1; r <= iRow + 1; r++ )
    {
        for ( let c = iCol - 1; c <= iCol + 1; c++ )
        {
            if ( r === iRow && c === iCol )
                continue;

            const neighbor = seatGrid.get( r, c );
            if ( neighbor === SeatState.Occupied )
                numOccupiedAdjacentSeats++;
        }
    }
    return numOccupiedAdjacentSeats;
}

export function problem11_part1( input: string, logLevel: LoggingLevel = LoggingLevel.Off ): number
{
    const seatGridA: Grid<string> = stringToGrid( input );
    const seatGridB: Grid<string> = stringToGrid( input );
    let currentGrid = seatGridA;
    let nextGrid = seatGridB;

    let numStateChangesThisRound = null;
    const { numRows, numCols } = currentGrid.getSize();
    let iRound = 0;
    let numOccupiedSeats = 0;

    while ( numStateChangesThisRound !== 0 )
    {
        numStateChangesThisRound = 0;
        numOccupiedSeats = 0;

        for ( let iRow = 0; iRow < numRows; iRow++ )
        {
            for ( let iCol = 0; iCol < numCols; iCol++ )
            {
                const currentPosition: string = currentGrid.get( iRow, iCol );
                if ( currentPosition === SeatState.Floor )
                    continue;

                const currentSeatState: SeatState = currentPosition as SeatState;
                const numOccupiedAdjacentSeats = calculateNumOccupiedAdjacentSeats( currentGrid, iRow, iCol );
                const newSeatState = calculateNewSeatState( currentSeatState, numOccupiedAdjacentSeats );

                if ( newSeatState !== currentSeatState )
                    numStateChangesThisRound++;

                if ( newSeatState === SeatState.Occupied )
                    numOccupiedSeats++;

                nextGrid.set( iRow, iCol, newSeatState );
            }
        }

        iRound++;
        if ( logLevel >= LoggingLevel.Basic )
        {
            console.log( `${numStateChangesThisRound} state changes occurred during round ${iRound}, resulting in ${numOccupiedSeats} occupied seats` );
            console.log( nextGrid.toString() );
        }
        let temp = nextGrid;
        nextGrid = currentGrid;
        currentGrid = temp;
    }
    return numOccupiedSeats;
}

// export function problem11_part2( input: string ): number
// {

// }