export class Node
{
    parents: Node[];
    children: Node[];
    name: string;
    value: number;

    constructor( name: string, value: number )
    {
        this.parents = [];
        this.children = [];
        this.name = name;
        this.value = value;
    }

    addParent( myNewParent: Node )
    {
        this.parents.push( myNewParent );
        myNewParent.children.push( this );
    }

    addChild( myNewChild: Node )
    {
        if ( !myNewChild )
            throw new Error( "Attempting to add undefined node to network" );

        if ( this.children.includes( myNewChild ) )
            throw new Error( `Attempting to add duplicate child '${myNewChild.name}' to tree node '${this.name}'` )
        this.children.push( myNewChild );
        myNewChild.parents.push( this );
    }

    // TODO - finish implementing this
    getAllAncestorNames( names: Set<string> = new Set() ): Set<string>
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
}
/*
a -> returns ['a']
|
b -> this.parent.getAllAncestorNames() returned ['a'], so return [this.name, 'a']
|
c
*/