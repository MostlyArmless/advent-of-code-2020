export interface Y2023P6Input {
  time: number[];
  distance: number[];
}

// I'm not writing a parser for this one, just gunna manually parse it.
export const PROBLEM_6_INPUT: Y2023P6Input = {
  time: [44, 89, 96, 91],
  distance: [277, 1136, 1890, 1768]
};