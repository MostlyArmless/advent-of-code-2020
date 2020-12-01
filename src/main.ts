import { problem1input } from '../data/problem1input';
import { problem1_part1, problem1_part2 } from './problem1';

console.log( `Running all problems...` );
const problem1_part1_answer = problem1_part1( problem1input );
console.log( `Answer to problem 1a = ${problem1_part1_answer}` );

const problem1_part2_answer = problem1_part2( problem1input );
console.log( `Answer to problem 1b = ${problem1_part2_answer}` );