import { Coordinate } from "./Coord";
import { Grid, stringToGrid } from "./Grid";
import { LoggingLevel } from "./interfaces";
enum HillContents
{
    Empty = '.',
    Tree = '#',
    EmptyVisited = 'O',
    TreeVisited = 'X'
}

export interface IProblem3Part1Result
{
    numTreesEncountered: number;
    finalHillString: string;
}

export interface IProblem3Part2Result
{
    numTreesPerScenario: number[];
    productOfAllNumTreesEncountered: number;
}

function calculateNumTilingsRequired( sledVelocity: Coordinate, input: string ): number
{
    const lines = input.split( '\n' );
    const tileHeight = lines.length;
    const tileWidth = lines[0].length;

    const numStepsToExitHill = Math.ceil( tileHeight / sledVelocity.y );
    const horizontalDistanceTraversed = sledVelocity.x * numStepsToExitHill;
    const numTilesRequired = Math.ceil( horizontalDistanceTraversed / tileWidth );
    return numTilesRequired;
}

function hillSledding( input: string, sledVelocity: Coordinate, overideNumTilings?: number, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem3Part1Result
{
    const numTilings = overideNumTilings ? overideNumTilings : calculateNumTilingsRequired( sledVelocity, input );
    const hill: Grid<string> = stringToGrid( input, numTilings );
    const height = hill.getSize().numRows;
    let sledPosition = new Coordinate( 0, 0 ); // Top left corner (x increases right, y increases up)

    let numTreesEncountered = 0;
    let iStep = 0;
    while ( sledPosition.y < height )
    {
        const whatIsHere = hill.get( sledPosition.y, sledPosition.x );
        numTreesEncountered += whatIsHere === HillContents.Tree ? 1 : 0;

        if ( loggingLevel >= LoggingLevel.Verbose )
        {
            const temp = hill.get( sledPosition.y, sledPosition.x );
            hill.set( sledPosition.y, sledPosition.x, 'S' );
            console.log( `Hill state after ${iStep} moves:\n${hill.toString( true, true, false )}` );
            console.log( `sledPosition after ${iStep} moves: ${sledPosition.getId()}` );
            console.log( `hillContents at sledPosition = "${whatIsHere}"` );
            hill.set( sledPosition.y, sledPosition.x, temp );
        }

        if ( iStep > 0 ) // Don't draw an 'O' or 'X' in the starting position of the sled, only the later positions that it moves to
            hill.set( sledPosition.y, sledPosition.x, whatIsHere === HillContents.Tree ? HillContents.TreeVisited : HillContents.EmptyVisited );

        sledPosition.add( sledVelocity );
        iStep++;
    }

    return {
        numTreesEncountered: numTreesEncountered,
        finalHillString: hill.toString( false, false, false )
    };
}

export function problem3_part1( input: string, overideNumTilings?: number, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem3Part1Result
{
    const sledVelocity = new Coordinate( 3, 1 ); // Move right 3 and down 1 each timestep (y increases downwards since we're plotting with a Grid class, where the origin (0,0) is in the top-left corner)
    return hillSledding( input, sledVelocity, overideNumTilings, loggingLevel );
}

export function problem3_part2( input: string, loggingLevel: LoggingLevel = LoggingLevel.Off ): IProblem3Part2Result
{
    const sledVelocities: Coordinate[] = [
        new Coordinate( 1, 1 ),
        new Coordinate( 3, 1 ),
        new Coordinate( 5, 1 ),
        new Coordinate( 7, 1 ),
        new Coordinate( 1, 2 ),
    ];

    const numTreesPerScenario: number[] = sledVelocities.map( velocity =>
    {
        return hillSledding( input, velocity, undefined, loggingLevel ).numTreesEncountered
    } );

    const productOfAllNumTreesEncountered = numTreesPerScenario.reduce( ( a, b ) => a * b );

    return {
        numTreesPerScenario: numTreesPerScenario,
        productOfAllNumTreesEncountered: productOfAllNumTreesEncountered
    };
}