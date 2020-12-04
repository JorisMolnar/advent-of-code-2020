import { performance } from "perf_hooks";
import { FieldCheck } from "./models";

const fieldChecks: { [key: string]: FieldCheck } = {
  byr: (v) => Number(v) >= 1920 && Number(v) <= 2002,
  iyr: (v) => Number(v) >= 2010 && Number(v) <= 2020,
  eyr: (v) => Number(v) >= 2020 && Number(v) <= 2030,
  hgt: (v) => {
    if (v.endsWith("cm")) {
      const val = Number(v.substr(0, v.length - 2));
      return val >= 150 && val <= 193;
    }
    if (v.endsWith("in")) {
      const val = Number(v.substr(0, v.length - 2));
      return val >= 59 && val <= 76;
    }
    return false;
  },
  hcl: (v) => v.startsWith("#") && /^#[0-9a-f]{6}$/.test(v),
  ecl: (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
  pid: (v) => /^\d{9}$/.test(v),
  // cid: () => true
};

export class Program {
  main(input: string): void {
    const t0 = performance.now();
    const result = this.calcResult(input);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string): number {
    const passports = this.splitPassports(input);

    const valid = passports.filter(p => this.checkValid(p));

    return valid.length;
  }

  private checkValid(passport: string): boolean {
    return Object.entries(fieldChecks)
      .every(([key, check]) => this.checkField(this.splitFields(passport), key, check));
  }

  private checkField(passportData: string[], key: string, check: FieldCheck): boolean {
    const field = passportData.find(d => d.startsWith(key));
    if (!field) {
      return false;
    }
    return check(field.substr(4));
  }

  private splitPassports(input: string): string[] {
    return input.split("\n\n");
  }

  private splitFields(passport: string): string[] {
    return passport.split(/\s+/);
  }
}
