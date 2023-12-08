
import { PROBLEM_11_INPUT } from "../../data/2020/problem11Input";
import { stringToGrid } from "../../src/Grid";
import { calculateNumOccupiedVisibleSeats, problem11_part1, problem11_part2 } from "../../src/2020/problem11";

describe('Problem 11', () => {
    const problem11SampleInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

    it('Part 1 sample', () => {
        expect(problem11_part1(problem11SampleInput)).toEqual(37);
    });

    it('Part 1 final', () => {
        expect(problem11_part1(PROBLEM_11_INPUT)).toEqual(2354);
    });

    it('Part 2 sample', () => {
        expect(problem11_part2(problem11SampleInput)).toEqual(26);
    });

    describe('calculateNumVisibleOccupiedSeats', () => {
        const inputDistantVisibleOccupiedSeats = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`;

        const inputOccludedSeats = `.............
.L.L.#.#.#.#.
.............`;

        it('All visible seats occupied, non-adjacent', () => {
            expect(calculateNumOccupiedVisibleSeats(stringToGrid(inputDistantVisibleOccupiedSeats), 4, 3)).toEqual(8);
        });

        it('Leftmost seat', () => {
            expect(calculateNumOccupiedVisibleSeats(stringToGrid(inputOccludedSeats), 1, 1)).toEqual(0);
        });

        it('Second seat', () => {
            expect(calculateNumOccupiedVisibleSeats(stringToGrid(inputOccludedSeats), 1, 3)).toEqual(1);
        });

        it('Third seat', () => {
            expect(calculateNumOccupiedVisibleSeats(stringToGrid(inputOccludedSeats), 1, 5)).toEqual(1);
        });

        it('Fourth seat', () => {
            expect(calculateNumOccupiedVisibleSeats(stringToGrid(inputOccludedSeats), 1, 7)).toEqual(2);
        });
    });
});