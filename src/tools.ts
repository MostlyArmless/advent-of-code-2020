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