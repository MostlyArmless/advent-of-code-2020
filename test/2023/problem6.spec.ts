
import { PROBLEM_6_INPUT, Y2023P6Input } from "../../data/2023/problem6Input";
import { problem6_part1 } from "../../src/2023/problem6";

describe('Problem 6', () => {
    const problem6SampleInput: Y2023P6Input = {
        time: [7, 15, 30],
        distance: [9, 40, 200]
    };

    it('Part 1 sample', () => {
        expect(problem6_part1(problem6SampleInput)).toEqual(288);
    });

    it('Part 1 final', () => {
        expect(problem6_part1(PROBLEM_6_INPUT)).toEqual(2344708);
    });
});