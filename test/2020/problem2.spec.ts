
import { PROBLEM_2_INPUT } from "../../data/2020/problem2Input";
import { LoggingLevel } from "../../src/interfaces";
import { IProblem2Result, problem2_part1_internal, problem2_part2_internal } from "../../src/2020/problem2";

describe('Problem 2', () => {
    const sampleInput: string = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

    it('Part 1 sample', () => {
        const result: IProblem2Result = problem2_part1_internal(sampleInput, LoggingLevel.Verbose);
        expect(result.numValidPasswords).toEqual(2);
        expect(result.validPasswordIndices).toEqual([true, false, true]);
    });

    it('Part 1 final', () => {
        const result: IProblem2Result = problem2_part1_internal(PROBLEM_2_INPUT, LoggingLevel.Verbose);
        expect(result.numValidPasswords).toEqual(548);
    });

    it('Part 2 sample', () => {
        const result: IProblem2Result = problem2_part2_internal(sampleInput, LoggingLevel.Verbose);
        expect(result.numValidPasswords).toEqual(1);
        expect(result.validPasswordIndices).toEqual([true, false, false]);
    });

    it('Part 2 final', () => {
        const result: IProblem2Result = problem2_part2_internal(PROBLEM_2_INPUT, LoggingLevel.Verbose);
        expect(result.numValidPasswords).toEqual(502);
    });
});