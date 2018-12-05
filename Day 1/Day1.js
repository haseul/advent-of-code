let startTime = Date.now();

const HashSet = require("hashset");
const fs = require("fs");

let input = fs.readFileSync("input.txt", {encoding: "utf8"})
let inputArray = input.split("\n");

let num = 0;
let freqSet = new HashSet();
let notfound = true;

while (notfound == true) {
    for (i=0; i < inputArray.length; i++) {
        let input = parseInt(inputArray[i]);
        num += input;
        notfound = freqSet.add(num);
        if (!notfound) break;
    }
}   
let timeElapsed = Date.now() - startTime;

console.log(num);
console.log(`Took ${timeElapsed}ms`);