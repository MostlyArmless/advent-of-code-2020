import { getNumDigitsInNumber } from "./tools";

export class Grid<T>
{
    private numRows: number;
    private numCols: number;
    private grid: T[][];

    constructor( numRows: number, numCols: number, fillWith?: T )
    {
        if ( numRows === 0 || numCols === 0 )
            throw new Error( "Can't make a size-zero grid" );

        this.numRows = numRows;
        this.numCols = numCols;

        fillWith = fillWith === undefined ? null : fillWith;
        this.fillGrid( fillWith );
    }

    set( iRow: number, iCol: number, value: T ): void
    {
        if ( iRow < 0 || iRow >= this.numRows )
            throw new Error( `iRow ${iRow} out of range: 0 to ${this.numRows - 1}` );
        if ( iCol < 0 || iCol >= this.numCols )
            throw new Error( `iCol ${iCol} out of range: 0 to ${this.numCols - 1}` );

        this.grid[iRow][iCol] = value;
    }

    get( iRow: number, iCol: number ): T
    {
        const row = this.grid[iRow];
        if ( row === undefined )
            return undefined;

        return row[iCol];
    }

    getSize(): { numRows: number, numCols: number }
    {
        return {
            numRows: this.grid.length,
            numCols: this.grid[0].length
        };
    }

    fillGrid( value: T )
    {
        this.grid = Array( this.numRows );

        for ( let iRow = 0; iRow < this.numRows; iRow++ )
        {
            this.grid[iRow] = [];

            for ( let iCol = 0; iCol < this.numCols; iCol++ )
            {
                this.grid[iRow].push( value );
            }
        }
    }

    toString( insertSpaces: boolean = true, includeLegend: boolean = false, flipVertically: boolean = false ): string
    {
        if ( includeLegend && !insertSpaces )
            throw new Error( "Invalid option combo: insertSpaces must be true if includeLegend is true" );

        const numSpacesBetweenElements: number = includeLegend ? getNumDigitsInNumber( this.numCols ) : 1;
        let str = '';
        let rowLegend: string[] = Array( this.numRows ).fill( '' );
        const numDigitsInNumRows = getNumDigitsInNumber( this.numRows );

        if ( includeLegend )
        {
            // Prepend header row
            str += insertSpaces ? '   ' : ' '; // Blank top left corner for legend
            for ( let iCol = 0; iCol < this.numCols; iCol++ )
            {
                const numDigitsIn_iCol = getNumDigitsInNumber( iCol );
                const numPadSpaces = numSpacesBetweenElements - numDigitsIn_iCol + 1;
                str += String( iCol ) + ' '.repeat( numPadSpaces );
            }
            str += '\n';

            for ( let iRow = this.numRows - 1; iRow >= 0; iRow-- )
            {
                const numDigitsIn_iRow = getNumDigitsInNumber( iRow );
                const numPadSpaces = numDigitsInNumRows - numDigitsIn_iRow + 1;
                const rowLabel = String( iRow );
                rowLegend[iRow] = rowLabel + ' '.repeat( numPadSpaces );
            }
        }


        if ( flipVertically )
        {
            for ( let iRow = this.numRows - 1; iRow >= 0; iRow-- )
            {
                str += rowLegend[iRow] + this.grid[iRow].toString() + '\n';
            }
        }
        else
        {
            for ( let iRow = 0; iRow < this.numRows; iRow++ )
            {
                str += rowLegend[iRow] + this.grid[iRow].toString() + '\n';
            }
        }

        const replacementChar: string = insertSpaces ? ' '.repeat( numSpacesBetweenElements ) : '';
        return str.replace( /,/g, replacementChar ).trimEnd();
    }

    squarify(): void
    {
        if ( this.numRows === this.numCols )
            return;

        const fillValue = this.get( this.numRows - 1, this.numCols - 1 ); // Fill with whatever is at the bottom-right

        if ( this.numRows < this.numCols )
        {
            // Append rows to the bottom
            for ( let iRow = this.numRows; iRow < this.numCols; iRow++ )
            {
                this.grid[iRow] = Array( this.numCols ).fill( fillValue );
            }
        }
        else
        {
            // Append columns to the right
            const numColsToAdd = this.numRows - this.numCols;
            for ( let iRow = 0; iRow < this.numRows; iRow++ )
            {
                this.grid[iRow] = this.grid[iRow].concat( Array( numColsToAdd ).fill( fillValue ) );
            }
            this.numCols = this.numRows;
        }

        this.numRows = this.grid.length;
        this.numCols = this.grid[this.numRows - 1].length;
        return;
    }

    concat( otherGrid: Grid<T> ): Grid<T>
    {
        // Glue the otherGrid to the right side of this grid
        if ( otherGrid.getSize().numRows !== this.getSize().numRows )
            throw new Error( "Can't concat grids of different heights" );

        const combinedWidth = this.numCols + otherGrid.numCols;
        const combinedGrid = new Grid<T>( this.numRows, combinedWidth );

        for ( let iRow = 0; iRow < this.numRows; iRow++ )
        {
            for ( let iCol = 0; iCol < combinedWidth; iCol++ )
            {
                const val = iCol < this.numCols ? this.get( iRow, iCol ) : otherGrid.get( iRow, iCol - this.numCols );
                combinedGrid.set( iRow, iCol, val );
            }
        }

        return combinedGrid;
    }
}

export function blankGrid( numRows: number, numCols: number ): any[][]
{
    let arr = [];
    for ( let iRow = 0; iRow < numRows; iRow++ )
    {
        arr.push( [] );
        for ( let iCol = 0; iCol < numCols; iCol++ )
        {
            arr[iRow].push( null );
        }
    }

    return arr;
}

export function copyGrid<T>( grid: Grid<T> ): Grid<T>
{
    const { numRows, numCols } = grid.getSize();
    let cpy = new Grid<T>( numRows, numCols );

    for ( let iRow = 0; iRow < numRows; iRow++ )
    {
        for ( let iCol = 0; iCol < numCols; iCol++ )
        {
            cpy.set( iRow, iCol, grid.get( iRow, iCol ) );
        }
    }

    return cpy;
}

export function stringToGrid( input: string, horizontalCopies: number = 1 ): Grid<string>
{
    const lines = input.split( '\n' );
    const height = lines.length;
    const width = lines[0].length * ( horizontalCopies );
    let grid = new Grid<string>( height, width );

    for ( let iRow = 0; iRow < height; iRow++ )
    {
        const line = lines[iRow];
        for ( let iCol = 0; iCol < width; iCol++ )
        {
            grid.set( iRow, iCol, line[iCol % line.length] );
        }
    }

    return grid;
}