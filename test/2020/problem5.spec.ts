
import { PROBLEM_5_INPUT } from "../../data/2020/problem5Input";
import { parseBoardingPass, problem5_part1, problem5_part2 } from "../../src/2020/problem5";

describe('Problem 5', () => {
    it('Part 1 sample 1', () => {
        expect(parseBoardingPass('FBFBBFFRLR')).toEqual({ row: 44, column: 5, seatId: 357 });
    });

    it('Part 1 sample 2', () => {
        expect(parseBoardingPass('BFFFBBFRRR')).toEqual({ row: 70, column: 7, seatId: 567 });
    });

    it('Part 1 sample 3', () => {
        expect(parseBoardingPass('FFFBBBFRRR')).toEqual({ row: 14, column: 7, seatId: 119 });
    });

    it('Part 1 sample 4', () => {
        expect(parseBoardingPass('BBFFBBFRLL')).toEqual({ row: 102, column: 4, seatId: 820 });
    });

    it('Part 1 final', () => {
        expect(problem5_part1(PROBLEM_5_INPUT)).toEqual(878);
    });

    it('Part 2 final', () => {
        expect(problem5_part2(PROBLEM_5_INPUT)).toEqual(504);
    });
});
