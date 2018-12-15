let startTime = Date.now();

const fs = require("fs");

let input = fs.readFileSync("input.txt", {encoding: "utf8"})
let inputArray = input.split("\n");

let totalOverlapping = 0;
let noOverlap = [];
let table = [];
for (let i=0; i < inputArray.length; i++) {
    let input = inputArray[i];
    let id = parseInt(input.match(/#(\d+)/)[1]);
    let coords = input.split("@")[1].split(":")[0].trim();
    let xCoord = parseInt(coords.split(",")[0]);
    let yCoord = parseInt(coords.split(",")[1]);
    let dimensions = input.split(":")[1].trim();
    let xDimension = parseInt(dimensions.split("x")[0]);
    let yDimension = parseInt(dimensions.split("x")[1]);

    for (let i=0; i < yDimension; i++) {
        if (!table[yCoord + i]) table[yCoord + i] = [];
        for (let j=0; j < xDimension; j++) {
            if (!table[yCoord + i][xCoord + j]) {
                table[yCoord + i][xCoord + j] = [id];
            } else {
                if (table[yCoord + i][xCoord + j].length == 1) totalOverlapping += 1;
                table[yCoord + i][xCoord + j].push(id);
            }
        }
    }
}

for (let i=0; i < inputArray.length; i++) {
    let overlapping = 0;
    let input = inputArray[i];
    let id = parseInt(input.match(/#(\d+)/)[1]);
    let coords = input.split("@")[1].split(":")[0].trim();
    let xCoord = parseInt(coords.split(",")[0]);
    let yCoord = parseInt(coords.split(",")[1]);
    let dimensions = input.split(":")[1].trim();
    let xDimension = parseInt(dimensions.split("x")[0]);
    let yDimension = parseInt(dimensions.split("x")[1]);

    for (let i=0; i < yDimension; i++) {
        for (let j=0; j < xDimension; j++) {
            if (table[yCoord + i][xCoord + j].length > 1) overlapping += 1;
        }
    }
    if (overlapping === 0) noOverlap.push(id);
}

let timeElapsed = Date.now() - startTime;

console.log(noOverlap);
console.log(totalOverlapping);
console.log(`Took ${timeElapsed}ms`)