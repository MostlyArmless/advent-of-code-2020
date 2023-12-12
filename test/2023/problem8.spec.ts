
import { PROBLEM_8_INPUT } from "../../data/2023/problem8Input";
import { problem8_part1, problem8_part2 } from "../../src/2023/problem8";

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

    const problem8SampleInputC = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

    it('Part 2 sample C', (): void => {
        expect(problem8_part2(problem8SampleInputC)).toEqual(6);
    });

    it('Part 2 final', (): void => {
        expect(problem8_part2(PROBLEM_8_INPUT)).toEqual(13129439557681);
    });
});