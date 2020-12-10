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
    const adapters = this.parseInput(input).sort((a, b) => a - b);
    adapters.unshift(0); // input joltage
    adapters.push(Math.max(...adapters) + 3); // output joltage

    let amountD1 = 0;
    let amountD3 = 0;
    for (let i = 1; i < adapters.length; i++) {
      if (adapters[i] - adapters[i - 1] === 1) {
        amountD1++;
      } else if (adapters[i] - adapters[i - 1] === 3) {
        amountD3++;
      }
    }

    console.log(`D1: ${amountD1}, D3: ${amountD3}`);
    return amountD1 * amountD3;
  }

  private parseInput(input: string): number[] {
    return input.split("\n").map(Number);
  }
}

// const sum = (numbers: number[]): number => numbers.reduce((a, b) => a + b);
// const slice = <T>(list: T[], start: number, length: number): T[] => list.slice(start, start + length);
// const sliceSum = (list: number[], start: number, length: number): number => sum(slice(list, start, length));
