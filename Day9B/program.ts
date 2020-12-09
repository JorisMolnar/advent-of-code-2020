import { performance } from "perf_hooks";

export class Program {
  main({ input, target }: { input: string, target: number }): void {
    const t0 = performance.now();
    const result = this.calcResult(input, target);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string, target: number): number {
    const numbers = this.parseInput(input);
    const targetPos = numbers.indexOf(target);

    for (let i = 0; i < targetPos; i++) {
      for (let j = 2; j < targetPos - i; j++) {
        const sum = sliceSum(numbers, i, j);

        if (sum === target) {
          const low = Math.min(...slice(numbers, i, j));
          const high = Math.max(...slice(numbers, i, j));
          console.log(`low: ${low}, high: ${high}`);
          return low + high;
        }

        if (sum > target) {
          break;
        }
      }
    }

    throw new Error("No solution found");
  }

  private parseInput(input: string): number[] {
    return input.split("\n").map(Number);
  }
}

const sum = (numbers: number[]): number => numbers.reduce((a, b) => a + b);
const slice = <T>(list: T[], start: number, length: number): T[] => list.slice(start, start + length);
const sliceSum = (list: number[], start: number, length: number): number => sum(slice(list, start, length));
