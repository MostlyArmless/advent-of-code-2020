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
    return 0;
}