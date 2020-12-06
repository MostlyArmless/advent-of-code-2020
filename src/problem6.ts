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