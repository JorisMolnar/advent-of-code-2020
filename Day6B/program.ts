import { split } from "lodash";
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
    return sum(
      input.split("\n\n")
        .map(group => {
          const uniques = new Set(group.replace(/\n/g, ""));
          const people = group.split("\n").length;

          return countBy(
            new Array(...uniques),
            (ans) => countBy(group.split(""), (item) => ans === item) === people
          );
        })
    );
  }
}

function countBy<T>(list: Array<T>, predicate: (item: T) => boolean): number {
  return list.reduce((a, b) => a + Number(predicate(b)), 0);
}

const countUnique = (list: Array<unknown>): number => new Set(list).size;
const sum = (list: Array<number>): number => list.reduce((a, b) => a + b);
