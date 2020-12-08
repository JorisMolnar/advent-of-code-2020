import { performance } from "perf_hooks";

import { Computer } from "./computer";
import { Instruction, Operation } from "./models";

export class Program {
  async main(input: string): Promise<void> {
    const t0 = performance.now();
    const result = await this.calcResult(input);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer (ignore):", result);
  }

  private async calcResult(input: string): Promise<number> {
    const instructions = this.parseInput(input);
    const computer = new Computer(instructions);

    await computer.run();

    return -1;
  }

  private parseInput(input: string): Instruction[] {
    return input.split("\n").map(line => this.parseLine(line));
  }

  private parseLine(line: string): Instruction {
    const [op, ...args] = line.split(" ");

    return {
      op: op as Operation,
      args: args.map(Number)
    };
  }
}
