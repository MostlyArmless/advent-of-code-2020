export enum LoggingLevel
{
    Off = 0,
    Basic = 1,
    Verbose = 2
}

export interface AdventOfCodeAnswer {
    answer: string; // Could be any type but it must be cast to a string for printing.
    description: string; // Title of the value within the context of the problem, e.g. 'productOfAllNumTreesEncountered' for 2020 problem 3 part 2
}