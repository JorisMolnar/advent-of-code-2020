import { performance } from "perf_hooks";

export class Program {
  main(input: string): void {
    const t0 = performance.now();
    const result = this.calcResult(input);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string): number {
    return sum(input.split("\n\n").map(group => countUnique(group.replace(/\n/g, "").split(""))));
  }
}

const countUnique = (list: Array<unknown>): number => new Set(list).size;
const sum = (list: Array<number>): number => list.reduce((a, b) => a + b);
