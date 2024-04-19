export function XOR(a: boolean, b: boolean): boolean {
    return a ? !b : b;
}

export function getNumDigitsInNumber(N: number): number {
    if (N === 0)
        return 1;

    const nAbs = Math.abs(N);
    return Math.floor(Math.log10(nAbs)) + 1;
}

export function inRange(x: number, minInclusive: number, maxInclusive: number): boolean {
    return minInclusive <= x && x <= maxInclusive;
}

export function shuffle(array: any[]): any[] {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function isDigit(s: string): boolean {
    return /^\d$/.test(s);
}

// Return a new set containing only the elements from setA and setB which are present in BOTH.
export function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const intersection = new Set(
        [...setA].filter(element => setB.has(element))
    );

    return intersection;
}

export function reportProgress(startTime: [number, number], i: number, total: number) {
    const elapsed = process.hrtime(startTime);
    const elapsedSeconds = elapsed[0];
    const elapsedMilliseconds = (elapsed[1] / 1000000).toFixed(0); // divide by a million to get nano to milli
    const percent = (i / total * 100).toFixed(1);
    const velocity = i / elapsedSeconds; // iterations per second
    const remainingIterations = total - i; // iterations
    const remainingTime = remainingIterations / velocity; // seconds
    console.log(`On iteration ${i} of ${total} (${percent}%) after ${elapsedSeconds}.${elapsedMilliseconds} seconds, ${remainingTime} seconds remaining...`); // print message + time
}

export function greatestCommonDenominator(a: number, b: number): number {
    return b === 0 ? a : greatestCommonDenominator(b, a % b);
}

export function leastCommonMultiple(a: number, b: number): number {
    return a / greatestCommonDenominator(a, b) * b;
}

export function leastCommonMultipleOfMany(n: number[]): number {
    return n.reduce(leastCommonMultiple, 1);
}

export type Direction = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';
// Assumes that iRow = 0, iCol = 0 is the top left
// i.e. iRow increases downwards, and iCol increases rightwards
export function getGridNeighborCoords(iRow: number, iCol: number, numRows: number, numCols: number, directions?: Direction[]) {
    if (!directions || directions.length === 0) {
        // Look in every direction
        directions = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'];
    }

    const neighbors = [];
    directions.forEach(direction => {
        switch (direction) {
            case 'N': {
                if (isInsideGrid(iRow - 1, iCol, numRows, numCols)) {
                    neighbors.push(`${iRow - 1},${iCol}`);
                }
                break;
            }
            case 'S': {
                if (isInsideGrid(iRow + 1, iCol, numRows, numCols)) {
                    neighbors.push(`${iRow + 1},${iCol}`);
                }
                break;
            }
            case 'E': {
                if (isInsideGrid(iRow, iCol + 1, numRows, numCols)) {
                    neighbors.push(`${iRow},${iCol + 1}`);
                }
                break;
            }
            case 'W': {
                if (isInsideGrid(iRow, iCol - 1, numRows, numCols)) {
                    neighbors.push(`${iRow},${iCol - 1}`);
                }
                break;
            }
            case 'NE': {
                if (isInsideGrid(iRow - 1, iCol + 1, numRows, numCols)) {
                    neighbors.push(`${iRow - 1},${iCol + 1}`);
                }
                break;
            }
            case 'NW': {
                if (isInsideGrid(iRow - 1, iCol - 1, numRows, numCols)) {
                    neighbors.push(`${iRow - 1},${iCol - 1}`);
                }
                break;
            }
            case 'SE': {
                if (isInsideGrid(iRow + 1, iCol + 1, numRows, numCols)) {
                    neighbors.push(`${iRow + 1},${iCol + 1}`);
                }
                break;
            }
            case 'SW': {
                if (isInsideGrid(iRow + 1, iCol - 1, numRows, numCols)) {
                    neighbors.push(`${iRow + 1},${iCol - 1}`);
                }
                break;
            }
        }
    });

    return neighbors;
}

export function isInsideGrid(iRow: number, iCol: number, numRows: number, numCols: number): boolean {
    return iRow >= 0 && iCol >= 0 && iRow < numRows && iCol < numCols;
}