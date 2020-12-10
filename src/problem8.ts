import { Computer } from "./Computer";

export function problem8_part1( input: string ): number
{
    const comp = new Computer( input );
    return comp.findAccValBeforeInfiniteLoop();
}