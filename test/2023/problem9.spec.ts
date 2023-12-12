
import { PROBLEM_9_INPUT } from "../../data/2023/problem9Input";
import { diff, extrapolateSequence, problem9_part1 } from "../../src/2023/problem9";

describe('Problem 9', () => {
    const problem9SampleInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

    it('Part 1 sample', () => {
        expect(problem9_part1(problem9SampleInput)).toEqual(114);
    });

    it('diff', (): void => {
        expect(diff([0, 3, 6, 9, 12, 15])).toEqual([3, 3, 3, 3, 3]);
    });

    it('extrapolateSequence', (): void => {
        expect(extrapolateSequence([0, 0, 0])).toEqual(0);
        expect(extrapolateSequence([1, 1, 1, 1])).toEqual(1);
        expect(extrapolateSequence([2, 3, 4, 5, 6])).toEqual(7);
        expect(extrapolateSequence([1, 3, 6, 10, 15, 21])).toEqual(28);
    });

    it('Part 1 final', () => {
        expect(problem9_part1(PROBLEM_9_INPUT)).toEqual(1762065988);
    });
});