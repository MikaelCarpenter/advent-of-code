/**
 * 
Day 1: Not Quite Lisp
=====================
Santa is trying to deliver presents in a large apartment building, but he can't find the right floor - the directions he got are a little confusing. He starts on the ground floor (floor 0) and then follows the instructions one character at a time.

An opening parenthesis, (, means he should go up one floor, and a closing parenthesis, ), means he should go down one floor.

The apartment building is very tall, and the basement is very deep; he will never find the top or bottom floors.

To what floor do the instructions take Santa?

Part 2
======
Now, given the same instructions, find the position of the first character that causes him to enter the basement (floor -1). The first character in the instructions has position 1, the second character has position 2, and so on.

What is the position of the character that causes Santa to first enter the basement?
 */

import { INPUT_ONE } from "./001.input.ts";

function getDestinationFloor(input: string) {
  let floor = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "(") {
      floor++;
    } else if (char === ")") {
      floor--;
    } else {
      console.error("Invalid character: ", char);
    }
  }

  return floor;
}

console.log("Destination floor: ", getDestinationFloor(INPUT_ONE));

function getBasementPosition(input: string) {
  let floor = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "(") {
      floor++;
    } else if (char === ")") {
      floor--;
    } else {
      console.error("Invalid character: ", char);
    }

    if (floor === -1) {
      return i + 1;
    }
  }
}

console.log("Basement position: ", getBasementPosition(INPUT_ONE));
