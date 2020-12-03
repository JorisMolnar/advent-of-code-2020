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
    const map = this.parseInput(input);

    const amount =
      this.countTrees(map, { x: 1, y: 1 }) *
      this.countTrees(map, { x: 3, y: 1 }) *
      this.countTrees(map, { x: 5, y: 1 }) *
      this.countTrees(map, { x: 7, y: 1 }) *
      this.countTrees(map, { x: 1, y: 2 });

    return amount;
  }

  private countTrees(map: string[], slope: { x: number; y: number }): number {
    const height = map.length;
    const width = map[0].length;

    let x = 0;
    let y = 0;

    let amount = 0;
    while (y < height) {
      if (map[y][x % width] === "#") {
        amount++;
      }
      x += slope.x;
      y += slope.y;
    }

    return amount;
  }

  private parseInput(input: string): string[] {
    return input.split("\n");
  }
}
