/**
--- Day 5: Doesn't He Have Intern-Elves For This? ---
Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.

For example:
- ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
- aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
- jchzalrnumimnmhp is naughty because it has no double letter.
- haegwjzuvuyypxyu is naughty because it contains the string xy.
- dvszwmarrgswjxmb is naughty because it contains only one vowel.

How many strings are nice?

 */

import { assertEquals } from "jsr:@std/assert";

const inputPath = new URL("../inputs/2015.005.txt", import.meta.url).pathname;
const input = Deno.readTextFileSync(inputPath);

const VOWELS = ["a", "e", "i", "o", "u"];
const NAUGHTY_SEQUENCES = ["ab", "cd", "pq", "xy"];

function isNiceString(string: string) {
  let vowelCount = 0;
  let doubleLetterFound = false;
  let naughtySequenceFound = false;

  for (let i = 0; i < string.length; i++) {
    const prevChar = string[i - 1];
    const currentChar = string[i];

    if (VOWELS.includes(currentChar)) vowelCount++;
    if (prevChar === currentChar) doubleLetterFound = true;
    if (NAUGHTY_SEQUENCES.includes(prevChar + currentChar)) naughtySequenceFound = true;
  }

  return vowelCount >= 3 && doubleLetterFound && !naughtySequenceFound;
}

function testCase(testCase: string, isNice: boolean) {
  assertEquals(isNiceString(testCase), isNice);
}

Deno.test("Examples", async (t) => {
  const examples = [
    { input: "ugknbfddgicrmopn", isNice: true },
    { input: "aaa", isNice: true },
    { input: "jchzalrnumimnmhp", isNice: false },
    { input: "haegwjzuvuyypxyu", isNice: false },
    { input: "dvszwmarrgswjxmb", isNice: false },
  ];

  for (const { input, isNice } of examples) {
    await t.step(input, () => testCase(input, isNice));
  }
});

function getNiceStringCount(testFxn: (input: string) => boolean) {
  const lines = input.split("\n");

  const niceStringCount = lines.reduce((count, line) => {
    return testFxn(line) ? count + 1 : count;
  }, 0);

  return niceStringCount;
}

console.log("NICE STRINGS: ", getNiceStringCount(isNiceString));

/**
--- Part Two ---
Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.

For example:
- qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
- xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
- uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
- ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.

How many strings are nice under these new rules?
 */

function isNiceStringV2(string: string) {
  let repeatWithGapFound = false;
  let nonOverlappingPairsFound = false;
  let prevPair = "";

  const pairs: Record<string, boolean> = {};

  for (let i = 0; i < string.length; i++) {
    const currentChar = string[i];
    const nextChar = string[i + 1];
    const potentialRepeat = string[i + 2];
    const pair = `${currentChar}${nextChar}`;

    if (currentChar === potentialRepeat && currentChar !== nextChar) repeatWithGapFound = true;
    if (pair !== prevPair && pairs[pair]) nonOverlappingPairsFound = true;

    pairs[pair] = true;
    prevPair = `${currentChar}${nextChar}`;
  }

  return repeatWithGapFound && nonOverlappingPairsFound;
}

function testCaseV2(testCase: string, isNice: boolean) {
  assertEquals(isNiceStringV2(testCase), isNice);
}

Deno.test("Part 2 Examples", async (t) => {
  const examples = [
    { input: "qjhvhtzxzqqjkmpb", isNice: true },
    { input: "xxyxx", isNice: true },
    { input: "uurcxstgmygtbstg", isNice: false },
    { input: "ieodomkazucvgmuy", isNice: false },
    { input: "dvszwmarrgswsjmb", isNice: false },
  ];

  for (const { input, isNice } of examples) {
    await t.step(input, () => testCaseV2(input, isNice));
  }
});

console.log("NICE STRINGS V2: ", getNiceStringCount(isNiceStringV2));
