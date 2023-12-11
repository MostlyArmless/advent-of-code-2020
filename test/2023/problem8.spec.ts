
import { PROBLEM_8_INPUT } from "../../data/2023/problem8Input";
import { problem8_part1 } from "../../src/2023/problem8";

describe('Problem 8', () => {
    const problem8SampleInputA = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

    const problem8SampleInputB = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

    it('Part 1 sample A', () => {
        expect(problem8_part1(problem8SampleInputA)).toEqual(6);
    });

    it('Part 1 sample B', () => {
        expect(problem8_part1(problem8SampleInputB)).toEqual(2);
    });

    it('Part 1 final', () => {
        expect(problem8_part1(PROBLEM_8_INPUT)).toEqual(13771);
    });
});