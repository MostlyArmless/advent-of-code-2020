import { getGridNeighborCoords } from "../tools";

export function problem10_part1(input: string): number {
    const graph = new Map<string, string[]>();
    const rows = input.split('\n');
    const numRows = rows.length;
    const numCols = rows[0].length;

    const specialSymbols = '|-LJ7F';
    let startingCoords = '';
    // Build the connectivity graph
    rows.forEach((line, iRow) => {
        line.split('').forEach((char, iCol) => {
            if (char === '.') {
                // there's nothing here, keep going
                return;
            }

            const here = `${iRow},${iCol}`;
            let neighbors = [];
            switch (char) {
                case '|': neighbors = getGridNeighborCoords(iRow, iCol, numRows, numCols, ['N', 'S']);
                case '-': neighbors = getGridNeighborCoords(iRow, iCol, numRows, numCols, ['E', 'W']);
                case 'L': neighbors = getGridNeighborCoords(iRow, iCol, numRows, numCols, ['N', 'E']);
                case 'J': neighbors = getGridNeighborCoords(iRow, iCol, numRows, numCols, ['N', 'W']);
                case '7': neighbors = getGridNeighborCoords(iRow, iCol, numRows, numCols, ['W', 'S']);
                case 'F': neighbors = getGridNeighborCoords(iRow, iCol, numRows, numCols, ['E', 'S']);
                case 'S': {
                    neighbors = getGridNeighborCoords(iRow, iCol, numRows, numCols).filter(xyCoord => {
                        const [iRowNeighbor, iColNeighbor] = xyCoord.split(',');
                        const neighborSymbol = rows[parseInt(iRowNeighbor)][parseInt(iColNeighbor)];
                        return specialSymbols.includes(neighborSymbol);
                    });
                    // Save the coords of the 'S' character, it's the starting point
                    startingCoords = here;
                }
            }

            graph.set(here, neighbors);
        });
    });

    // Starting at the 'S', do djikstra's algo to find shortest path from 'S' to every other node
    const distances = new Map<NodeName, Distance>(Array.from(graph.keys()).map(name => [name, Number.POSITIVE_INFINITY]));
    distances.set(startingCoords, 0);
    const visitedNodes = new Set([startingCoords]);

    let currentNode = startingCoords;
    while (true) {
        for (const neighbor of graph.get(currentNode)) {
            distances.set(currentNode, 1);
        }
    }

    return maxDistance;
}
type NodeName = string;
type Distance = number;

export function problem10_part2(input: string): number {
    return 0;
}