import { leastCommonMultipleOfMany } from "../tools";

export function problem8_part1(input: string): number {
    const nodeMap = new Map<string, [string, string]>();

    const lines = input.split('\n');
    const instructions = lines[0];
    for (let i = 2; i < lines.length; i++) {
        const matches = lines[i].match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/);
        const here = matches[1];
        const left = matches[2];
        const right = matches[3];

        nodeMap.set(here, [left, right]);
    }

    // Follow the instructions
    let currentNode = 'AAA';
    let i = 0;
    const numInstructions = instructions.length;
    while (currentNode !== 'ZZZ') {
        const nextInstruction = instructions[i % numInstructions];
        currentNode = nodeMap.get(currentNode)[nextInstruction === 'L' ? 0 : 1];
        i++;
    }
    return i;
}

export function problem8_part2(input: string): number {
    const nodeMap = new Map<string, [string, string]>();
    let paths: string[] = [];
    let stepCounts: number[] = [];

    const lines = input.split('\n');
    const instructions = lines[0];
    for (let i = 2; i < lines.length; i++) {
        const matches = lines[i].match(/([0-9A-Z]+) = \(([0-9A-Z]+), ([0-9A-Z]+)\)/);
        const here = matches[1];
        const left = matches[2];
        const right = matches[3];
        if (here.endsWith('A')) {
            paths.push(here);
            stepCounts.push(0);
        }

        nodeMap.set(here, [left, right]);
    }

    // Follow the instructions for each starting node
    const numPaths = paths.length;
    const pathLengths = new Array(numPaths);
    const numInstructions = instructions.length;
    for (let iPath = 0; iPath < numPaths; iPath++) {
        let iStep = 0;
        while (!paths[iPath].endsWith('Z')) {
            // consider the current path
            let currentNode = paths[iPath % numPaths];

            // go left or right on this path
            const nextInstruction = instructions[iStep % numInstructions];
            currentNode = nodeMap.get(currentNode)[nextInstruction === 'L' ? 0 : 1];
            paths[iPath] = currentNode;

            iStep++;
        }
        pathLengths[iPath] = iStep;
    }

    console.log(pathLengths);
    return leastCommonMultipleOfMany(pathLengths);
}