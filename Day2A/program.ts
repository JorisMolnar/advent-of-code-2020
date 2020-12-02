import { performance } from "perf_hooks";
import { Password } from "./models";

export class Program {
  main(input: string): void {
    const t0 = performance.now();
    const result = this.calcResult(input);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string): number {
    const passwords = this.parseInput(input);
    return passwords.filter(this.checkPassword).length;
  }

  private checkPassword(password: Password): boolean {
    const amount = password.password.split(password.policy.char).length - 1;
    return password.policy.min <= amount && amount <= password.policy.max;
  }

  private parseInput(input: string): Password[] {
    return input.split("\n").map(line => {
      const match = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/.exec(line);

      if (!match) {
        throw new Error("Invalid input");
      }

      return {
        password: match[4],
        policy: {
          char: match[3],
          min: Number(match[1]),
          max: Number(match[2]),
        }
      };
    });
  }
}
