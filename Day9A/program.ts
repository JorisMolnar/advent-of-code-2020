import { performance } from "perf_hooks";

export class Program {
  main({ input, preamble }: { input: string, preamble: number }): void {
    const t0 = performance.now();
    const result = this.calcResult(input, preamble);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string, preamble: number): number {
    const numbers = this.parseInput(input);

    for (let i = preamble; i < numbers.length; i++) {
      const checkValues = this.getCheckValues(numbers, preamble, i);
      if (!this.isNumberValid(numbers[i], checkValues)) {
        return numbers[i];
      }
    }

    throw new Error("No wrong numbers found");
  }

  private getCheckValues(numbers: number[], preamble: number, position: number): number[] {
    return numbers.slice(position - preamble, position);
  }

  private isNumberValid(number: number, checkValues: number[]): boolean {
    for (let i = 0; i < checkValues.length; i++) {
      for (let j = 0; j < checkValues.length; j++) {
        if (i === j) break;

        if (number === checkValues[i] + checkValues[j]) {
          return true;
        }
      }
    }

    return false;
  }

  private parseInput(input: string): number[] {
    return input.split("\n").map(Number);
  }
}
