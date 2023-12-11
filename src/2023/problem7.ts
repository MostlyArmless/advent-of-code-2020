export function problem7_part1(input: string): number {
    const handsAndBids: HandAndBid[] = input.split('\n').map(s => {
        const matches = s.match(/^([TJQKA0-9]{5}) (\d+)$/);
        return {
            hand: matches[1],
            bid: parseInt(matches[2])
        };
    });
    handsAndBids.sort(comparator);
    return handsAndBids.map((handAndBid, i) => handAndBid.bid * (i + 1)).reduce((a, b) => a + b);
}

export function problem7_part2(input: string): number {
    const handsAndBids: HandAndBid[] = input.split('\n').map(s => {
        const matches = s.match(/^([TJQKA0-9]{5}) (\d+)$/);
        return {
            hand: matches[1],
            bid: parseInt(matches[2])
        };
    });
    handsAndBids.sort(comparatorWithJokerRule);
    return handsAndBids.map((handAndBid, i) => handAndBid.bid * (i + 1)).reduce((a, b) => a + b);
}

interface HandAndBid {
    hand: string;
    bid: number;
}

// Returns: -1 if handA < handB, 0 if equal, 1 if handA > handB
export function comparator(A: HandAndBid, B: HandAndBid): number {
    const aType = getHandType(A.hand, false);
    const bType = getHandType(B.hand, false);
    if (aType < bType) {
        return -1;
    } else if (aType > bType) {
        return 1;
    } else {
        return tiebreaker(A.hand, B.hand, false);
    }
}

export function comparatorWithJokerRule(A: HandAndBid, B: HandAndBid): number {
    const aType = getHandType(A.hand, true);
    const bType = getHandType(B.hand, true);
    if (aType < bType) {
        return -1;
    } else if (aType > bType) {
        return 1;
    } else {
        return tiebreaker(A.hand, B.hand, true);
    }
}

export enum HandType {
    HighCard, // Weakest
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind // Strongest
}

type CardType = string;
type Count = number;

export function getHandType(hand: string, useJokerRule: boolean): HandType {
    const handMap = new Map<CardType, Count>();
    for (let i = 0; i < hand.length; i++) {
        const char = hand[i];
        const newCount = (handMap.get(char) ?? 0) + 1;
        handMap.set(char, newCount);
    }

    const numJokers = handMap.get('J');
    if (useJokerRule && numJokers > 0) {
        // The joker should be converted to whatever the best card is.
        // To determine this, we need to know what the hand type is WITHOUT the joker rule

        const originalHandType = getHandType(hand, false);
        switch (originalHandType) {
            case HandType.FiveOfAKind: {
                // The orignal hand was ALL Jokers. Can't be improved
                return originalHandType;
            }
            case HandType.FourOfAKind: {
                // Either we have 4J and 1 other or 4other and 1J.
                // Either way, this can be converted to a five of a kind
                return HandType.FiveOfAKind;
            }
            case HandType.ThreeOfAKind: {
                // if 3J A B, converts to four of a kind
                // if 3A B J, converts to four of a kind
                return HandType.FourOfAKind;
            }
            case HandType.FullHouse: {
                // Either we have 3J and 2 matching others, or 2J and 3 matching others.
                // Either way, this converts to five of a kind
                return HandType.FiveOfAKind;
            }
            case HandType.TwoPair: {
                // if 2J 2A 1B, converts to four of a kind
                // if 2A 2B 1J, converts to full house
                return numJokers === 2 ? HandType.FourOfAKind : HandType.FullHouse;
            }
            case HandType.OnePair: {
                // if 2J A B C, converts to three of a kind
                // if 2A B C J, converts to three of a kind
                return HandType.ThreeOfAKind;
            }
            case HandType.HighCard: {
                return HandType.OnePair;
            }
            default: throw new Error(`Unhandled joker situation: ${hand}`);
        }
    }

    if (handMap.size === 1) {
        return HandType.FiveOfAKind;
    }
    if (handMap.size === 5) {
        return HandType.HighCard;
    }
    const counts = Array.from(handMap.values()).sort().reverse(); // e.g. [3, 2]
    if (counts[0] === 4) {
        return HandType.FourOfAKind;
    }
    if (counts[0] === 2 && counts[1] === 2) {
        return HandType.TwoPair;
    }
    if (counts[0] === 3) {
        if (counts[1] === 2) {
            return HandType.FullHouse;
        }
        return HandType.ThreeOfAKind;
    }
    if (counts[0] === 2) {
        return HandType.OnePair;
    }
}

export function tiebreaker(handA: string, handB: string, useJokerRule: boolean): number {
    for (let i = 0; i < handA.length; i++) {
        const aScore = getCardScore(handA[i], useJokerRule);
        const bScore = getCardScore(handB[i], useJokerRule);
        if (aScore === bScore) {
            continue;
        }
        return aScore - bScore;
    }
    // If we got to the end, we know the hands are identical so their scores are equal.
    return 0;
}

export function getCardScore(card: string, useJokerRule: boolean): number {
    switch (card) {
        case '2': return 2;
        case '3': return 3;
        case '4': return 4;
        case '5': return 5;
        case '6': return 6;
        case '7': return 7;
        case '8': return 8;
        case '9': return 9;
        case 'T': return 10;
        case 'J': return useJokerRule ? 1 : 11;
        case 'Q': return 12;
        case 'K': return 13;
        case 'A': return 14;
        default: throw new Error(`Invalid card ${card}`);
    }
}