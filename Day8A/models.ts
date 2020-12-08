export interface Instruction {
  /** Operation */
  op: Operation;
  /** Arguments */
  args: Argument[];
}

export type Operation = "acc" | "jmp" | "nop";
export type Argument = number;
