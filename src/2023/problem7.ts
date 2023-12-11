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

interface HandAndBid {
    hand: string;
    bid: number;
}

// Returns: -1 if handA < handB, 0 if equal, 1 if handA > handB
export function comparator(A: HandAndBid, B: HandAndBid): number {
    const aType = getHandType(A.hand);
    const bType = getHandType(B.hand);
    if (aType < bType) {
        return -1;
    } else if (aType > bType) {
        return 1;
    } else {
        return tiebreaker(A.hand, B.hand);
    }
}

// function getHandScore(hand: string, i: number) {
//     return
// }

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

export function getHandType(hand: string): HandType {
    const handMap = new Map<CardType, Count>();
    for (let i = 0; i < hand.length; i++) {
        const char = hand[i];
        const newCount = (handMap.get(char) ?? 0) + 1;
        handMap.set(char, newCount);
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

export function tiebreaker(handA: string, handB: string): number {
    for (let i = 0; i < handA.length; i++) {
        const aScore = getCardScore(handA[i]);
        const bScore = getCardScore(handB[i]);
        if (aScore === bScore) {
            continue;
        }
        return aScore - bScore;
    }
    // If we got to the end, we know the hands are identical so their scores are equal.
    return 0;
}

export function getCardScore(card: string): number {
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
        case 'J': return 11;
        case 'Q': return 12;
        case 'K': return 13;
        case 'A': return 14;
        default: throw new Error(`Invalid card ${card}`);
    }
}

export function problem7_part2(input: string): number {
    return 0;
}