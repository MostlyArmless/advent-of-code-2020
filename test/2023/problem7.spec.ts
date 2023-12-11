
import { PROBLEM_7_INPUT } from "../../data/2023/problem7Input";
import { HandType, comparator, getHandType, problem7_part1, problem7_part2 } from "../../src/2023/problem7";

describe('Problem 7', () => {
    const problem7SampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

    it('getHandType without Joker rule', (): void => {
        expect(getHandType('AAAAA', false)).toEqual(HandType.FiveOfAKind);
        expect(getHandType('AA8AA', false)).toEqual(HandType.FourOfAKind);
        expect(getHandType('23332', false)).toEqual(HandType.FullHouse);
        expect(getHandType('TTT98', false)).toEqual(HandType.ThreeOfAKind);
        expect(getHandType('23432', false)).toEqual(HandType.TwoPair);
        expect(getHandType('A23A4', false)).toEqual(HandType.OnePair);
        expect(getHandType('23456', false)).toEqual(HandType.HighCard);

        // Jokery hands
        expect(getHandType('T55J5', false)).toEqual(HandType.ThreeOfAKind);
    });

    it('getHandType WITH Joker rule', (): void => {
        expect(getHandType('AAAAA', true)).toEqual(HandType.FiveOfAKind);
        expect(getHandType('AA8AA', true)).toEqual(HandType.FourOfAKind);
        expect(getHandType('23332', true)).toEqual(HandType.FullHouse);
        expect(getHandType('TTT98', true)).toEqual(HandType.ThreeOfAKind);
        expect(getHandType('23432', true)).toEqual(HandType.TwoPair);
        expect(getHandType('A23A4', true)).toEqual(HandType.OnePair);
        expect(getHandType('23456', true)).toEqual(HandType.HighCard);

        // Jokery hands
        expect(getHandType('T55J5', true)).toEqual(HandType.FourOfAKind);
    });

    it('comparator', (): void => {
        expect(comparator({ hand: '32T3K', bid: 10 }, { hand: 'QQQJA', bid: 11 })).toBeLessThan(0);
        expect(comparator({ hand: 'KK677', bid: 10 }, { hand: 'KTJJT', bid: 11 })).toBeGreaterThan(0);
        expect(comparator({ hand: 'AAAAA', bid: 10 }, { hand: 'AAAAA', bid: 11 })).toEqual(0);
    });

    it('Part 1 sample', () => {
        expect(problem7_part1(problem7SampleInput)).toEqual(6440);
    });

    it('Part 1 final', () => {
        expect(problem7_part1(PROBLEM_7_INPUT)).toEqual(248559379);
    });

    it('Part 2 sample', () => {
        expect(problem7_part2(problem7SampleInput)).toEqual(5905);
    });

    it('Part 2 final', () => {
        expect(problem7_part2(PROBLEM_7_INPUT)).toEqual(249631254);
    });
});