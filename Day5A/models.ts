export class Seat {
  constructor(
    public readonly row: number,
    public readonly column: number
  ) { }

  get id(): number {
    return this.row * 8 + this.column;
  }
}
