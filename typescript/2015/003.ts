/**
--- Day 3: Perfectly Spherical Houses in a Vacuum ---
Santa is delivering presents to an infinite two-dimensional grid of houses.

He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.

However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?

For example:
- > delivers presents to 2 houses: one at the starting location, and one to the east.
- ^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
- ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.

--- Part Two ---
The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to deliver presents with him.

Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as the previous year.

This year, how many houses receive at least one present?

For example:
- ^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
- ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
- ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.

 */

const inputPath = new URL("../inputs/2015.003.txt", import.meta.url).pathname;
const input = Deno.readTextFileSync(inputPath);

type VisitedHouses = Record<number, Record<number, number>>;

function getHousesGifted(input: Array<string>, previouslyVisitedHouses?: VisitedHouses) {
  const currentCoordinates = { x: 0, y: 0 };
  let uniqueHouseGiftedCount = previouslyVisitedHouses ? 0 : 1;
  const visitedHouses: VisitedHouses = previouslyVisitedHouses
    ? previouslyVisitedHouses
    : { 0: { 0: 1 } };

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "^") {
      currentCoordinates.y += 1;
    } else if (char === "v") {
      currentCoordinates.y -= 1;
    } else if (char === ">") {
      currentCoordinates.x += 1;
    } else if (char === "<") {
      currentCoordinates.x -= 1;
    } else {
      console.log("UNKNOWN CHARACTER: ", char, " AT: ", currentCoordinates);
    }

    if (!visitedHouses[currentCoordinates.y]) {
      visitedHouses[currentCoordinates.y] = {};
    }

    if (!visitedHouses[currentCoordinates.y][currentCoordinates.x]) {
      uniqueHouseGiftedCount += 1;
      visitedHouses[currentCoordinates.y][currentCoordinates.x] = 1;
    } else {
      visitedHouses[currentCoordinates.y][currentCoordinates.x] += 1;
    }
  }

  return { uniqueHouseGiftedCount, visitedHouses };
}

console.log(getHousesGifted(input.split("")).uniqueHouseGiftedCount);

function getHousesGiftedV2(input: string) {
  const santaSteps = input.split("").filter((_, index) => index === 0 || index % 2 === 0);
  const roboSantaSteps = input.split("").filter((_, index) => index !== 0 && index % 2 !== 0);

  const santaResults = getHousesGifted(santaSteps);
  const roboSantaResults = getHousesGifted(roboSantaSteps, santaResults.visitedHouses);

  return santaResults.uniqueHouseGiftedCount + roboSantaResults.uniqueHouseGiftedCount;
}

console.log(getHousesGiftedV2(input));
