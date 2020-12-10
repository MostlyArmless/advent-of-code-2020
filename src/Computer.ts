export class Computer
{
    private memory: string[];
    private instructionPointer: number;
    private accumulator: number;
    private visitedAddresses: Set<number>;
    private numInstructionsExecuted: number;

    constructor( program: string )
    {
        this.memory = program.split( '\n' );
        this.instructionPointer = 0;
        this.accumulator = 0;
        this.visitedAddresses = new Set<number>();
        this.numInstructionsExecuted = 0;
    }

    findAccValBeforeInfiniteLoop(): number
    {
        while ( true )
        {
            if ( this.visitedAddresses.has( this.instructionPointer ) )
                return this.accumulator;

            this.visitedAddresses.add( this.instructionPointer );
            this.executeInstruction( this.memory[this.instructionPointer] );
        }
    }

    private executeInstruction( instruction: string )
    {
        this.numInstructionsExecuted++;
        // console.log( `${instruction}   | ${this.numInstructionsExecuted}` );
        const parts = instruction.split( ' ' );
        const cmd = parts[0];
        const val = parseInt( parts[1] );

        switch ( cmd )
        {
            case 'acc':
                this.accumulator += val;
                break;
            case 'jmp':
                this.instructionPointer += val;
                return;
            case 'nop':
                break;
        }

        this.instructionPointer++;
    }
}