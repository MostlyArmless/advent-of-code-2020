import { Node } from "./Node";

export interface IProblem7Result
{
    numberOfValidContainers: number;
    validContainers: string[];
}

type BagType = string;

export function problem7_part1( bagRules: string, targetBagName: string ): IProblem7Result
{
    let node = new Node( 'dummy', 0 );
    let bagMap = new Map<BagType, Node>();

    bagRules.split( '\n' ).forEach( ( line, iLine, lines ) =>
    {
        const match = /(\w+ \w+) bags contain (.*)+/.exec( line );
        const parentBagName = match[1];
        if ( bagMap.has( parentBagName ) )
            node = bagMap.get( parentBagName );
        else
        {
            node = new Node( parentBagName, 0 );
            bagMap.set( parentBagName, node );
        }

        const childrenStrings = match[2].split( ',' );
        childrenStrings.forEach( childString =>
        {
            if ( childString === 'no other bags.' )
                return;

            const match2 = /(\d+) (\w+ \w+) bags?/.exec( childString );
            const childBagName = match2[2];
            const quantity = parseInt( match2[1] );
            let childNode: Node = bagMap.has( childBagName ) ? bagMap.get( childBagName ) : new Node( childBagName, quantity );
            bagMap.set( childBagName, childNode );
            node.addChild( childNode );
        } );
    } );

    const targetNode = bagMap.get( targetBagName );
    let validContainers: Set<string> = targetNode.getAllAncestorNames();

    return {
        numberOfValidContainers: validContainers.size,
        validContainers: Array.from( validContainers )
    }
}