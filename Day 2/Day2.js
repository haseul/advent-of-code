let startTime = Date.now();

const fs = require("fs");

let input = fs.readFileSync("input.txt", {encoding: "utf8"})
let inputArray = input.split("\n");
let twoOccurences = 0;
let threeOccurences = 0;
let correctID = "";

for (let i=0; i < inputArray.length; i++) {
    let input = inputArray[i];
    let charDict = {};

    for (let i=0; i < input.length; i++) {
        let char = input[i];
        if (charDict[char]) charDict[char] += 1;
        else charDict[char] = 1;
    }

    let found2 = false;
    let found3 = false;
    for (entry in charDict) {
        if (charDict[entry] === 2 && !found2) {
            twoOccurences += 1;
            found2 = true;
        }
        if (charDict[entry] === 3 && !found3) {
            threeOccurences += 1;
            found3 = true;
        }
    }

    for (let i=0; i < inputArray.length; i++) {
        let inputCompare = inputArray[i];
        let newLine = "";
        if (input === inputCompare) break;
        for (let i=0; i < input.length; i++) {
            let char = input[i];
            let charCompare = inputCompare[i];
            if (char == charCompare) newLine += char;
        }
        if (newLine.length > correctID.length) correctID = newLine;
    }
}
let timeElapsed = Date.now() - startTime;

console.log(twoOccurences * threeOccurences);
console.log(correctID);
console.log(`Took ${timeElapsed}ms`)