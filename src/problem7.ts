import { Node, ParentNodeName, } from "./Node";

export interface IProblem7Part1Result
{
    numberOfValidContainers: number;
    validContainers: string[];
    bagMap: BagMap1;
}

type BagType = string;
type QuantityOfThisInParent = number;
type NumChildren = number;
type ParentQuantityMap = Map<ParentNodeName, QuantityOfThisInParent>;
type BagMap1 = Map<BagType, Node<ParentQuantityMap>>;

function buildBagNetwork1( bagRules: string, targetBagName: string ): IProblem7Part1Result
{
    let node = new Node<ParentQuantityMap>( 'Dummy', new Map<ParentNodeName, QuantityOfThisInParent>() );
    let bagMap: BagMap1 = new Map<BagType, Node<ParentQuantityMap>>();

    bagRules.split( '\n' ).forEach( ( line, iLine, lines ) =>
    {
        const match = /(\w+ \w+) bags contain (.*)+/.exec( line );
        const parentBagName = match[1];
        if ( bagMap.has( parentBagName ) )
            node = bagMap.get( parentBagName );
        else
        {
            node = new Node( parentBagName, new Map<ParentNodeName, QuantityOfThisInParent>() );
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
            let childNode: Node<ParentQuantityMap> = bagMap.has( childBagName ) ? bagMap.get( childBagName ) : new Node( childBagName, new Map<ParentNodeName, QuantityOfThisInParent>( [[parentBagName, quantity]] ) );
            bagMap.set( childBagName, childNode );
            node.addChild( childNode );
        } );
    } );

    const targetNode = bagMap.get( targetBagName );
    let validContainers: Set<string> = targetNode.getAllAncestorNames();
    return {
        numberOfValidContainers: validContainers.size,
        validContainers: Array.from( validContainers ),
        bagMap: bagMap
    }
}

type ParentName = string;
type ChildName = string;
function buildBagMap( bagRules: string ): Map<ParentName, [NumChildren, ChildName][]>
{
    const bagMap = new Map<ParentName, [NumChildren, ChildName][]>();

    bagRules.split( '\n' ).forEach( ( line, iLine, lines ) =>
    {
        const match = /(\w+ \w+) bags contain (.*)+/.exec( line );
        const parentBagName = match[1];
        const childrenStrings = match[2].split( ',' );
        childrenStrings.forEach( childString =>
        {
            if ( childString === 'no other bags.' )
            {
                bagMap.set( parentBagName, [] ); // All bags should be keys in the map, even if they aren't parents. We'll discover they aren't parents by seeing their children length is zero when calling .get() later
                return;
            }

            const match2 = /(\d+) (\w+ \w+) bags?/.exec( childString );
            const childBagName = match2[2];
            const quantity = parseInt( match2[1] );

            let val: [NumChildren, ChildName][] = bagMap.has( parentBagName ) ? bagMap.get( parentBagName ) : [];
            val.push( [quantity, childBagName] );
            bagMap.set( parentBagName, val );
        } );
    } );

    return bagMap;
}

export function problem7_part1( bagRules: string, targetBagName: string ): IProblem7Part1Result
{
    return buildBagNetwork1( bagRules, targetBagName );
}

export function problem7_part2( bagRules: string, targetBagName: string ): number
{
    const bagMap: Map<ParentName, [NumChildren, ChildName][]> = buildBagMap( bagRules );
    let total = 0;
    let descendants: [NumChildren, ChildName][] = bagMap.get( targetBagName );
    let processingQueue: ParentName[] = [];

    while ( processingQueue.length > 0 || descendants.length > 0 )
    {
        descendants.forEach( child =>
        {
            const quantity: number = child[0];
            const childName: ChildName = child[1];
            total += quantity;
            for ( let i = 0; i < quantity; i++ )
            {
                processingQueue.push( childName );
            }
        } );

        descendants = bagMap.get( processingQueue.pop() );
    }

    return total;
}