import { performance } from "perf_hooks";

const requiredFields: string[] = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // "cid"
];

export class Program {
  main(input: string): void {
    const t0 = performance.now();
    const result = this.calcResult(input);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string): number {
    const passports = this.parseInput(input);

    const valid = passports.filter(this.checkValid);

    return valid.length;
  }

  private checkValid(passport: string): boolean {
    return requiredFields.every(req => passport.includes(req));
  }

  private parseInput(input: string): string[] {
    return input.split("\n\n");
  }
}
