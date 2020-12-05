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

    const highest = seats.reduce((a, b) => a.id > b.id ? a : b);

    return highest.id;
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
