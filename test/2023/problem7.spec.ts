
import { PROBLEM_7_INPUT } from "../../data/2023/problem7Input";
import { HandType, comparator, getHandType, problem7_part1 } from "../../src/2023/problem7";

describe('Problem 7', () => {
    const problem7SampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

    it('getHandType', (): void => {
        expect(getHandType('AAAAA')).toEqual(HandType.FiveOfAKind);
        expect(getHandType('AA8AA')).toEqual(HandType.FourOfAKind);
        expect(getHandType('23332')).toEqual(HandType.FullHouse);
        expect(getHandType('TTT98')).toEqual(HandType.ThreeOfAKind);
        expect(getHandType('23432')).toEqual(HandType.TwoPair);
        expect(getHandType('A23A4')).toEqual(HandType.OnePair);
        expect(getHandType('23456')).toEqual(HandType.HighCard);
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
});