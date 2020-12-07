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

    return this.countUniqueParents(graph["shiny gold"]);
  }

  private countUniqueParents(node: Node): number {
    const parents = this.getParentNodeIDs(node);
    const set = new Set(parents);
    return set.size;
  }

  private getParentNodeIDs(node: Node): string[] {
    if (node.parents.length === 0) {
      return [];
    }

    return node.parents.flatMap(n => [...this.getParentNodeIDs(n), n.id]);
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
