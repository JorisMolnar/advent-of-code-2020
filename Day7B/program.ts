import { performance } from "perf_hooks";
import { Graph, Node, Rule } from "./models";

export class Program {
  main(input: string): void {
    const t0 = performance.now();
    const result = this.calcResult(input);
    const t1 = performance.now();

    console.log(`Calc took ${t1 - t0} milliseconds.`);
    console.log("Answer:", result);
  }

  private calcResult(input: string): number {
    const graph = this.parseInput(input);

    return this.countChildren(graph["shiny gold"]);
  }

  private countChildren(node: Node): number {
    const amounts = this.getChildNodeAmounts(node);
    return amounts.reduce((a, b) => a + b);
  }

  private getChildNodeAmounts(node: Node): number[] {
    if (node.children.length === 0) {
      return [];
    }

    return node.children.flatMap(n => [...this.getChildNodeAmounts(n.value).map(a => a * n.amount), n.amount]);
  }

  private parseInput(input: string): Graph {
    const rules = input.split("\n").map(line => this.parseLine(line));
    return this.convertToGraph(rules);
  }

  private parseLine(line: string): Rule {
    const parts = line.split(" bags contain ");
    return {
      id: parts[0],
      children: parts[1] === "no other bags."
        ? []
        : parts[1]
          .split(", ")
          .map(child => {
            const matches = child.match(/(^\d+) ([a-z]+ [a-z]+) bags?/);
            if (!matches) throw new Error(`Invalid child string "${child}"`);
            return {
              childID: matches[2],
              amount: Number(matches[1])
            };
          })
    };
  }

  private convertToGraph(rules: Rule[]): Graph {
    const graph: Graph = {};

    // Initialize all objects
    for (const rule of rules) {
      graph[rule.id] = {
        id: rule.id,
        parents: [],
        children: []
      };
    }

    // Fill parent and children
    for (const rule of rules) {
      graph[rule.id].children.push(
        ...rule.children.map(c => ({
          value: graph[c.childID],
          amount: c.amount
        }))
      );

      // Fill parent on children
      for (const child of graph[rule.id].children) {
        child.value.parents.push(graph[rule.id]);
      }
    }

    return graph;
  }
}
