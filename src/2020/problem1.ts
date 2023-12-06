import { AdventOfCodeAnswer } from "../interfaces";
import { Find2Sum } from "../TwoSum";

export function problem1_part1( input: number[] ): AdventOfCodeAnswer
{
    const { a, b } = Find2Sum( input, 2020 );
    
    return {
        answer: (a*b).toString(),
        description: "Product of the two numbers in the input array which sum to 2020"
    }
}

export function problem1_part2( input: number[] ): AdventOfCodeAnswer
{
    return {
        answer: mapImplementation( input ).toString(),
        description: "Product of the three numbers {a,b,c} from the input array which sum to 2020"
    };
}

function mapImplementation( input: number[] ): number
{
    // Find {a,b,c} from elements in 'input' such that a+b+c = 2020. Return a*b*c.
    for ( let i = 0; i < input.length; i++ )
    {
        const a = input[i];
        for ( let j = 0; j < input.length; j++ )
        {
            if ( j === i )
                continue; // Must use 3 different numbers

            const b = input[j];
            for ( let k = 0; k < input.length; k++ )
            {
                if ( k === i || k === j )
                    continue; // Must use 3 different numbers

                const c = input[k];

                const sum = a + b + c;
                if ( sum === 2020 )
                    return a * b * c;

            }
        }
    }
}