export type ParentNodeName = string;
export type NodeName = string;

export class Node<ValType>
{
    parents: Node<ValType>[];
    children: Node<ValType>[];
    name: string;
    value: ValType;

    constructor( name: string, value: ValType )
    {
        this.parents = [];
        this.children = [];
        this.name = name;
        this.value = value;
    }

    addParent( myNewParent: Node<ValType> ): void
    {
        this.parents.push( myNewParent );
        myNewParent.children.push( this );
    }

    addChild( myNewChild: Node<ValType> ): void
    {
        if ( !myNewChild )
            throw new Error( "Attempting to add undefined node to network" );

        this.children.push( myNewChild );
        myNewChild.parents.push( this );
    }

    getAllAncestorNames( names: Set<ParentNodeName> = new Set() ): Set<ParentNodeName>
    {
        if ( this.parents.length > 0 )
        {
            this.parents.forEach( parent =>
            {
                names.add( parent.name );
                parent.getAllAncestorNames( names );
            } );
        }
        return names;
    }

    getAllChildValues( values: Map<NodeName, ValType> = new Map<NodeName, ValType>() ): Map<NodeName, ValType>
    {
        if ( this.children.length > 0 )
        {
            this.children.forEach( child =>
            {
                values.set( child.name, child.value );
                child.getAllChildValues( values );
            } );
        }
        return values;
    }

    getNumChildren( myChildren: number = 0 ): number
    {
        myChildren += this.children.length;
        if ( myChildren > 0 )
        {
            myChildren += this.children.map( child => child.getNumChildren() ).reduce( ( a, b ) => a + b );
        }
        return myChildren;
    }

    // Includes itself as a possible matching child
    findAllMatchingChildren( name: NodeName, nodes: Node<ValType>[] = [] ): Node<ValType>[]
    {
        if ( this.name === name )
            nodes.push( this );

        this.children.forEach( child =>
        {
            child.findAllMatchingChildren( name, nodes );
        } );

        return nodes;
    }

    addChildToMatchingDescendants( childToAdd: NodeName, childValue: ValType, descendantToUseAsParent: NodeName, numCopiesToAdd: number = 1, numChildrenAdded: number = 0 ): number
    {
        // Traverse the tree downward from this node looking for descendants with the right name,
        // then add the new child node to each of the matching descendants
        if ( this.name === descendantToUseAsParent )
        {
            for ( let i = 0; i < numCopiesToAdd; i++ )
            {
                this.addChild( new Node<ValType>( childToAdd, childValue ) );
                numChildrenAdded++
            }
        }

        if ( this.children.length === 0 )
            return numChildrenAdded;

        this.children.forEach( child =>
        {
            child.addChildToMatchingDescendants( childToAdd, childValue, descendantToUseAsParent );
        } );

        return numChildrenAdded;
    }

    getRootNodes( rootNodes?: Node<ValType>[] ): Node<ValType>[]
    {
        if ( this.parents.length === 0 )
        {
            rootNodes.push( this );
        }

        for ( let i = 0; i < this.parents.length; i++ )
        {
            this.parents[i];
            this.parents.forEach( parent => parent.getRootNodes( rootNodes ) );
        }


        return rootNodes
    }
}