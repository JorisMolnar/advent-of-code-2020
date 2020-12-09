export interface Rule {
  id: string;
  children: {
    childID: string;
    amount: number;
  }[];
}

export interface Graph {
  [id: string]: Node
}

export interface Node {
  id: string,
  parents: Node[],
  children: {
    value: Node,
    amount: number
  }[]
}
