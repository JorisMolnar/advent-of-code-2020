import { performance } from "perf_hooks";
import { cloneDeep } from "lodash";

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

    const mutations = this.createMutations(instructions);

    for (const mutation of mutations) {
      const computer = new Computer(mutation);

      try {
        await computer.run();
      } catch {
        // Ignore: just run next mutation
      }
    }

    return 0;
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

  private createMutations(instructions: Instruction[]): Instruction[][] {
    const mutations = [] as Instruction[][];

    for (let i = 0; i < instructions.length; i++) {
      const inst = instructions[i];
      if (inst.op === "jmp") {
        const mutation = cloneDeep(instructions);
        mutation[i].op = "nop";
        mutations.push(mutation);
      } else if (inst.op === "nop") {
        const mutation = cloneDeep(instructions);
        mutation[i].op = "jmp";
        mutations.push(mutation);
      }
    }

    return mutations;
  }
}
