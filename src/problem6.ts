export function problem6_part1( input: string ): number
{
    let groupAnswers: Set<string> = new Set();
    let total = 0;
    input.split( '\n' ).forEach( ( line, iLine, lines ) =>
    {
        if ( line === '' )
        {
            total += groupAnswers.size;
            groupAnswers = new Set();
            return;
        }

        line.split( '' ).forEach( letter =>
        {
            groupAnswers.add( letter );
        } );

        if ( iLine === lines.length - 1 )
        {
            total += groupAnswers.size;
            return;
        }
    } );

    return total;
}

export function problem6_part2( input: string ): number
{
    type Question = string;
    type NumPeopleWhoAnswered = number;
    let qMap = new Map<Question, NumPeopleWhoAnswered>();
    let total = 0;
    let groupSize = 0;

    input.split( '\n' ).forEach( ( line, iLine, lines ) =>
    {
        if ( line === '' )
        {
            qMap.forEach( ( numAnswers, question ) =>
            {
                if ( numAnswers === groupSize )
                {
                    total++; // Everyone in this group answered this question
                }
            } );
            qMap.clear();
            groupSize = 0;
            return;
        }

        groupSize++;

        line.split( '' ).forEach( letter =>
        {
            if ( qMap.has( letter ) )
            {
                qMap.set( letter, qMap.get( letter ) + 1 )
            }
            else
            {
                qMap.set( letter, 1 );
            }
        } );

        if ( iLine === lines.length - 1 )
        {
            qMap.forEach( ( numAnswers, question ) =>
            {
                if ( numAnswers === groupSize )
                    total++; // Everyone in this group answered this question
            } );
        }
    } );

    return total;
}