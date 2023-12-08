
import { PROBLEM_8_INPUT } from "../../data/2020/problem8Input";
import { problem8_part1, problem8_part2 } from "../../src/2020/problem8";

describe('Problem 8', () => {
    const problem8SampleInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

    it('Part 1 sample', () => {
        expect(problem8_part1(problem8SampleInput)).toEqual(5);
    });

    it('Part 1 final', () => {
        expect(problem8_part1(PROBLEM_8_INPUT)).toEqual(1331);
    });

    it('Part 2 sample', () => {
        expect(problem8_part2(problem8SampleInput)).toEqual(8);
    });

    it('Part 2 final', () => {
        expect(problem8_part2(PROBLEM_8_INPUT)).toEqual(1121);
    });
});