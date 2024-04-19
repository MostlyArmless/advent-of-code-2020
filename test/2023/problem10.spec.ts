
import { PROBLEM_10_INPUT } from "../../data/2023/problem10Input";
import { problem10_part1, problem10_part2 } from "../../src/2023/problem10";

describe('Problem 10', () => {
    const problem10SampleInput = `.....
.S-7.
.|.|.
.L-J.
.....`;

    it('Part 1 sample', () => {
        expect(problem10_part1(problem10SampleInput)).toEqual(4);
    });

    it('Part 1 final', () => {
        expect(problem10_part1(PROBLEM_10_INPUT)).toEqual(42);
    });

    it('Part 2 sample', () => {
        expect(problem10_part2(problem10SampleInput)).toEqual(42);
    });

    it('Part 2 final', () => {
        expect(problem10_part2(PROBLEM_10_INPUT)).toEqual(42);
    });
});