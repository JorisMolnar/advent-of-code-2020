import { Instruction } from "./models";

interface ComputerOptions {
  silent: boolean;
}

const DefaultOptions: ComputerOptions = {
  silent: false,
};

export class Computer {
  private readonly instructions: Instruction[];
  private readonly options: ComputerOptions;

  private accumilator: number;

  constructor(instructions: Instruction[], options?: Partial<ComputerOptions>) {
    this.instructions = [...instructions];
    this.options = { ...DefaultOptions, ...options };

    this.accumilator = 0;
  }

  async run(): Promise<void> {
    let ptr = 0;

    // eslint-disable-next-line no-constant-condition
    while (ptr < this.instructions.length) {
      this.checkLoop(ptr);

      const inst = this.readInst(ptr);

      if (inst.op === "acc") {         // add to accumilator
        this.accumilator += inst.args[0];
        ptr += 1;
      } else if (inst.op === "jmp") {  // jump offset
        ptr += inst.args[0];
      } else if (inst.op === "nop") {  // no operation
        ptr += 1;
      } else {
        throw new Error(`Unknown operation ${inst.op} at address ${ptr}`);
      }
    }

    throw new Error(`Pointer is out of bounds of instruction set; Pointer: ${ptr}; Instruction set length: ${this.instructions.length}`);
  }

  /** Read instruction from the specified position. */
  private readInst(ptr: number): Instruction {
    if (ptr < 0) {
      throw new Error(`Unsupported memory address ${ptr}. Memory addresses may not be negative.`);
    }

    const inst = this.instructions[ptr];
    if (!inst) {
      throw new Error(`Address ${ptr} is out of bounds.`);
    }

    return inst;
  }

  // Assignment specific
  visitedAddresses = [] as number[];
  private checkLoop(ptr: number): void {
    if (this.visitedAddresses.includes(ptr)) {
      this.ReportAccumilator();
      throw new Error("Infinite loop detected");
    }

    this.visitedAddresses.push(ptr);
  }

  // Assignment specific
  private ReportAccumilator(): void {
    console.log("Accumilator:", this.accumilator);
  }
}
