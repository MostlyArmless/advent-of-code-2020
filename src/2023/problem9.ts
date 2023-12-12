export function problem9_part1(input: string): number {
    const sequences = input.split('\n').map(line => line.split(' ').map(s => parseInt(s)));
    return sequences.map(sequence => {
        return extrapolateSequence(sequence);
    }).reduce((a, b) => a + b);
}

export function problem9_part2(input: string): number {
    return 0;
}

// Take the derivative of an array
export function diff(n: number[]): number[] {
    let derivative = new Array(n.length - 1);
    for (let i = 1; i < n.length; i++) {
        derivative[i - 1] = n[i] - n[i - 1];
    }
    return derivative;
}

export function extrapolateSequence(s: number[]): number {
    if (s.every(n => n === 0)) {
        return 0;
    }

    const ds = diff(s);
    return extrapolateSequence(ds) + s[s.length - 1];
}