import { Y2023P6Input } from "../../data/2023/problem6Input";

export function problem6_part1(input: Y2023P6Input): number {
    const numRaces = input.time.length;
    let numWaysToWin = new Array(numRaces);

    for (let iRace = 0; iRace < numRaces; iRace++) {
        const time = input.time[iRace];
        const distance = input.distance[iRace];

        numWaysToWin[iRace] = 0;
        for (let holdDuration = 0; holdDuration < time; holdDuration++) {
            const startingSpeed = holdDuration;
            const remainingTime = time - holdDuration;
            const totalDistance = startingSpeed * remainingTime;
            const isWin = totalDistance > distance;
            if (isWin) {
                numWaysToWin[iRace]++;
            }
        }
    }

    return numWaysToWin.reduce((a, b) => a * b);
}

export function problem6_part2(input: Y2023P6Input): number {
    input.time = [parseInt(input.time.map(n => n.toString()).reduce((s1, s2) => s1 + s2))];
    input.distance = [parseInt(input.distance.map(n => n.toString()).reduce((s1, s2) => s1 + s2))];

    return problem6_part1(input);
}