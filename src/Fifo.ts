export class Fifo<T>
{
    private queue: T[];

    constructor()
    {

    }

    add( val: T ): void
    {
        this.queue.unshift( val );
    }

    getNext(): T
    {
        return this.queue.pop();
    }
}