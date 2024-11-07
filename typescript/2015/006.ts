/**
--- Day 6: Probably a Fire Hazard ---
Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

For example:
- turn on 0,0 through 999,999 would turn on (or leave on) every light.
- toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
- turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.

After following the instructions, how many lights are lit?
 */
import { readFileSync } from "node:fs";

const input = readFileSync("../../../inputs/2015/006.txt", "utf-8");

const STARTING_GRID: Array<Array<boolean>> = new Array(1000)
  .fill(null)
  .map(() => new Array(1000).fill(false));

const instructions = input.split("\n");

const ixn_regex =
  /(?<action>turn on|turn off|toggle) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)/;

interface IxnMatch {
  groups?: {
    action?: "turn on" | "turn off" | "toggle";
    x1?: string;
    x2?: string;
    y1?: string;
    y2?: string;
  };
}

for (const ixn of instructions) {
  const match: IxnMatch | null = ixn.match(ixn_regex);

  if (match) {
    const { action, x1, x2, y1, y2 } = match.groups || {};

    for (let i = parseInt(x1 || ""); i <= parseInt(x2 || ""); i++) {
      for (let j = parseInt(y1 || ""); j <= parseInt(y2 || ""); j++) {
        if (action === "turn on") {
          STARTING_GRID[i][j] = true;
        } else if (action === "turn off") {
          STARTING_GRID[i][j] = false;
        } else if (action === "toggle") {
          STARTING_GRID[i][j] = !STARTING_GRID[i][j];
        } else {
          console.log("default case hit", i, j);
        }
      }
    }
  } else {
    console.log("NO MATCH");
  }
}

const onCount = STARTING_GRID.reduce((count, row) => {
  return count + row.filter(Boolean).length;
}, 0);

console.log(`COUNT = ${onCount}`);

/**
--- Part Two ---
You just finish implementing your winning light pattern when you realize you mistranslated Santa's message from Ancient Nordic Elvish.

The light grid you bought actually has individual brightness controls; each light can have a brightness of zero or more. The lights all start at zero.

The phrase turn on actually means that you should increase the brightness of those lights by 1.

The phrase turn off actually means that you should decrease the brightness of those lights by 1, to a minimum of zero.

The phrase toggle actually means that you should increase the brightness of those lights by 2.

What is the total brightness of all lights combined after following Santa's instructions?

For example:

turn on 0,0 through 0,0 would increase the total brightness by 1.
toggle 0,0 through 999,999 would increase the total brightness by 2000000.
 */
