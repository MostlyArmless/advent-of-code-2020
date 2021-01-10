import { Grid, stringToGrid } from "./Grid";
import { LoggingLevel } from "./interfaces";

enum SeatState
{
    Empty = 'L',
    Occupied = '#',
    Floor = '.'
}

enum Direction
{
    Up,
    UpRight,
    Right,
    DownRight,
    Down,
    DownLeft,
    Left,
    UpLeft
}

const searchMap = new Map<Direction, { rowDelta: number, colDelta: number }>( [
    [Direction.Up, { rowDelta: -1, colDelta: 0 }],
    [Direction.UpRight, { rowDelta: -1, colDelta: 1 }],
    [Direction.Right, { rowDelta: 0, colDelta: 1 }],
    [Direction.DownRight, { rowDelta: 1, colDelta: 1 }],
    [Direction.Down, { rowDelta: 1, colDelta: 0 }],
    [Direction.DownLeft, { rowDelta: 1, colDelta: -1 }],
    [Direction.Left, { rowDelta: 0, colDelta: -1 }],
    [Direction.UpLeft, { rowDelta: -1, colDelta: -1 }]
] );

function calculateNewSeatState( currentSeatState: SeatState, numOccupiedNeighbors: number, numToleratedNeighbors: number ): SeatState
{
    if ( currentSeatState === SeatState.Empty && numOccupiedNeighbors === 0 )
        return SeatState.Occupied
    else if ( currentSeatState === SeatState.Occupied && numOccupiedNeighbors >= numToleratedNeighbors )
        return SeatState.Empty;
    else
        return currentSeatState;
}

function calculateNumOccupiedAdjacentSeats( seatGrid: Grid<string>, iRow: number, iCol: number ): number
{
    // Look only at the immediately adjacent positions for occupied seats
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

export function calculateNumOccupiedVisibleSeats( seatGrid: Grid<string>, iRow: number, iCol: number ): number
{
    // Look as far as you have to in each of the 8 cardinal+diagonal directions to find a seat.
    let numVisibleOccupiedSeats = 0;
    searchMap.forEach( ( searchDeltas, direction ) =>
    {
        let r = iRow;
        let c = iCol;
        let val = seatGrid.get( r, c );
        while ( val !== undefined ) // Go until you go past the edge of the grid (indicated by 'undefined' value)
        {
            r += searchDeltas.rowDelta;
            c += searchDeltas.colDelta;
            val = seatGrid.get( r, c );
            if ( val === SeatState.Occupied )
            {
                numVisibleOccupiedSeats++;
                break;
            }
            else if ( val === SeatState.Empty )
            {
                break; // Stop looking if we found an empty seat
            }
        }
    } );

    return numVisibleOccupiedSeats;
}

function computeSeatingPlan( input: string, options: ISeatingOptions, logLevel: LoggingLevel )
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
                const numOccupiedNeighbors = options.neighborCriterion === NeighborCriterion.Adjacent ?
                    calculateNumOccupiedAdjacentSeats( currentGrid, iRow, iCol )
                    : calculateNumOccupiedVisibleSeats( currentGrid, iRow, iCol );

                const newSeatState = calculateNewSeatState( currentSeatState, numOccupiedNeighbors, options.numToleratedNeighbors );

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

enum NeighborCriterion
{
    Adjacent,
    Visible
}
interface ISeatingOptions
{
    numToleratedNeighbors: number;
    neighborCriterion: NeighborCriterion;
}

export function problem11_part1( input: string, logLevel: LoggingLevel = LoggingLevel.Off ): number
{
    const options: ISeatingOptions = {
        numToleratedNeighbors: 4,
        neighborCriterion: NeighborCriterion.Adjacent
    };
    return computeSeatingPlan( input, options, logLevel );
}

export function problem11_part2( input: string, logLevel: LoggingLevel = LoggingLevel.Off ): number
{
    const options: ISeatingOptions = {
        numToleratedNeighbors: 5,
        neighborCriterion: NeighborCriterion.Visible
    };
    return computeSeatingPlan( input, options, logLevel );
}