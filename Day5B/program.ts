import { performance } from "perf_hooks";
import { Seat } from "./models";

export class Program {
  main(input: string): void {
    const t0 = performance.now();
    const result = this.calcResult(input);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string): number {
    const seats = this.parseInput(input);
    const sortedIds = seats.map(s => s.id).sort((a, b) => a - b); // sort mutates original, but that doesn't matter

    let mine = -1;
    for (let i = 1; i < sortedIds.length; i++) {
      if (sortedIds[i] - sortedIds[i - 1] === 2) {
        mine = sortedIds[i] - 1;
        break;
      }
    }

    return mine;
  }

  private parseInput(input: string): Seat[] {
    return input
      .split("\n")
      .map(line => new Seat(
        parseInt(line.substr(0, 7).replace(/F/g, "0").replace(/B/g, "1"), 2),
        parseInt(line.substr(7, 3).replace(/L/g, "0").replace(/R/g, "1"), 2),
      ));
  }
}
