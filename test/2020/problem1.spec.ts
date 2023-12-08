
import { PROBLEM_1_INPUT } from '../../data/2020/problem1Input';
import { problem1_part1, problem1_part2 } from "../../src/2020/problem1";

describe('Problem 1', () => {
    const sampleInput: number[] = [1721, 979, 366, 299, 675, 1456];

    it('Part 1 sample', () => {
        expect(parseInt(problem1_part1(sampleInput).answer)).toEqual(514579);
    });

    it('Part 1 final', async () => {
        expect(parseInt(problem1_part1(PROBLEM_1_INPUT).answer)).toEqual(864864);
    });

    it('Part 2 sample', () => {
        expect(parseInt(problem1_part2(sampleInput).answer)).toEqual(241861950);
    });

    it('Part 2 final', async () => {
        expect(parseInt(problem1_part2(PROBLEM_1_INPUT).answer)).toEqual(281473080);
    });
});