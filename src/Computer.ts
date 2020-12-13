export enum EndCondition
{
    InfiniteLoopDetected,
    SuccessfulTermination
}
export interface IComputerResult
{
    endCondition: EndCondition;
    accumulatorValue: number;
    lastExecutedAddress: number;
}
enum Command
{
    Acc = 'acc',
    Jmp = 'jmp',
    Nop = 'nop'
}
interface Instruction
{
    command: Command;
    value: number;
}

export class Computer
{
    private memory: Instruction[];
    private ROM: string;
    private instructionPointer: number;
    private lastExecutedAddress: number;
    private accumulator: number;
    private visitedAddresses: Set<number>;
    private jmpNopAddresses: number[] = [];

    constructor( program: string )
    {
        this.ROM = program; // Save the original program in ROM in case we need to restart
        this.jmpNopAddresses = [];
        this.restart();
    }

    // Reset everything EXCEPT this.jmpNopAddresses
    restart(): void
    {
        this.memory = this.loadProgram( this.ROM );
        this.instructionPointer = 0;
        this.lastExecutedAddress = null;
        this.accumulator = 0;
        this.visitedAddresses = new Set<number>();
    }

    private parseCommand( cmd: string ): Command
    {
        switch ( cmd )
        {
            case 'jmp':
                return Command.Jmp;
            case 'acc':
                return Command.Acc;
            case 'nop':
                return Command.Nop;
            default:
                throw new Error( `Invalid command string: '${cmd}'` );
        }
    }

    private loadProgram( program: string ): Instruction[]
    {
        const instructions: Instruction[] = [];
        program.split( '\n' ).forEach( line =>
        {
            const parts = line.split( ' ' );
            const cmd = this.parseCommand( parts[0] );
            instructions.push( { command: cmd, value: parseInt( parts[1] ) } );
        } );
        return instructions;
    }

    private identifyAllJmpNopInstructions(): number[]
    {
        const jmpNops = [];
        this.memory.forEach( ( instruction, index ) =>
        {
            if ( instruction.command === Command.Nop || instruction.command === Command.Jmp )
                jmpNops.push( index );
        } );
        return jmpNops;
    }

    private swapJmpAndNop( address: number ): void
    {
        this.memory[address].command = this.memory[address].command === Command.Jmp ? Command.Nop : Command.Jmp;
    }

    fixBrokenBootProgram(): IComputerResult | null
    {
        this.jmpNopAddresses = this.identifyAllJmpNopInstructions();

        for ( let i = 0; i < this.jmpNopAddresses.length; i++ )
        {
            this.swapJmpAndNop( this.jmpNopAddresses[i] );

            const result = this.runUntilLoopDetected();
            if ( result.endCondition === EndCondition.SuccessfulTermination )
                return result;
            else
                this.restart();
        }
        return null;
    }

    runUntilLoopDetected(): IComputerResult
    {
        while ( this.instructionPointer !== this.memory.length )
        {
            if ( this.visitedAddresses.has( this.instructionPointer ) )
                return {
                    endCondition: EndCondition.InfiniteLoopDetected,
                    accumulatorValue: this.accumulator,
                    lastExecutedAddress: this.lastExecutedAddress
                };

            this.visitedAddresses.add( this.instructionPointer );
            this.executeInstruction( this.memory[this.instructionPointer] );
        }

        return {
            accumulatorValue: this.accumulator,
            endCondition: EndCondition.SuccessfulTermination,
            lastExecutedAddress: this.instructionPointer
        };
    }

    private executeInstruction( instruction: Instruction ): void
    {
        this.lastExecutedAddress = this.instructionPointer;
        switch ( instruction.command )
        {
            case Command.Acc:
                this.accumulator += instruction.value;
                break;
            case Command.Jmp:
                this.instructionPointer += instruction.value;
                return;
            case Command.Nop:
                break;
        }

        this.instructionPointer++;
    }
}