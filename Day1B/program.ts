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
    const numbers = this.parseInput(input);

    const [n1, n2, n3] = this.findCombination(numbers);

    console.log(n1, n2, n3);
    return n1 * n2 * n3;
  }

  private findCombination(numbers: number[]): [number, number, number] {
    for (const n1 of numbers) {
      for (const n2 of numbers) {
        for (const n3 of numbers) {
          if (n1 + n2 + n3 === 2020) {
            return [n1, n2, n3];
          }
        }
      }
    }

    throw new Error("No combination found");
  }

  private parseInput(input: string): number[] {
    return input.split("\n").map(s => Number(s));
  }
}
