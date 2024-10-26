/**
--- Day 4: The Ideal Stocking Stuffer ---
Santa needs help mining some AdventCoins (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.

To do this, he needs to find MD5 hashes which, in hexadecimal, start with at least five zeroes. The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal. To mine AdventCoins, you must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...) that produces such a hash.

For example:
- If your secret key is abcdef, the answer is 609043, because the MD5 hash of abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest such number to do so.
- If your secret key is pqrstuv, the lowest number it combines with to make an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of pqrstuv1048970 looks like 000006136ef....

Your puzzle input is iwrupvqb.

--- Part Two ---
Now find one that starts with six zeroes.
 */
import crypto from "node:crypto";

const INPUT = "iwrupvqb";

function findHashInput(sigDigits: number, maxTries: number = 1) {
  let numberInput = 0;
  let finalHash = "";
  let lowestNumberInput: number | null = null;

  while (lowestNumberInput === null) {
    const hash = crypto.createHash("md5").update(`${INPUT}${numberInput}`).digest("hex");

    if (numberInput % 100_000 === 0) console.log("We've reached: ", numberInput, hash, sigDigits);

    if (hash.slice(0, sigDigits) === "0".repeat(sigDigits)) {
      finalHash = hash;
      lowestNumberInput = numberInput;
    } else if (numberInput >= maxTries) {
      console.error("EXCEEDED MAX TRIES");
      lowestNumberInput = -1;
    } else {
      numberInput++;
    }
  }

  return { lowestNumberInput, finalHash };
}

console.log("5 zeroes input: ", findHashInput(5, 1_000_000));
console.log("6 zeroes input: ", findHashInput(6, 10_000_000));
