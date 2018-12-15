let startTime = Date.now();

const fs = require("fs");

compareDates = (a, b) => {
    let aDate = Date.parse(a.split("[")[1].split("]")[0]);
    let bDate = Date.parse(b.split("[")[1].split("]")[0]);
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
    return 0;
}

getInfo = (input) => {
    let info = {};
    let dateTime = input.split("[")[1].split("]")[0];
    let date = dateTime.split(" ")[0];
    let time = dateTime.split(" ")[1];
    info.month = parseInt(date.split("-")[1]);
    info.day = parseInt(date.split("-")[2]);
    info.minute = parseInt(time.split(":")[1]);
    let action = input.split("]")[1].trim();
    if (action == "falls asleep" || action == "wakes up") {
        info.action = action;
    } else {
        info.action = "change";
        info.guard = parseInt(action.match(/#(\d+)/)[1]);
    }
 
    return info;
}

let input = fs.readFileSync("input.txt", {encoding: "utf8"})
let inputArray = input.split("\n").sort(compareDates);
let guardSleepTimes = [];
let guardSleepTimeTotals = {};
let guardIDs = [];

let currGuard;
for (let i=0; i < inputArray.length; i++) {
    let input = inputArray[i];
    let inputInfo = getInfo(input);

    if (inputInfo.action == "change") {
        currGuard = inputInfo.guard;
        guardIDs.push(inputInfo.guard);
    }   
    if (!currGuard) continue;

    if (inputInfo.action == "falls asleep") {
        if (!guardSleepTimes[currGuard]) guardSleepTimes[currGuard] = [];
        if (!guardSleepTimes[currGuard][inputInfo.month]) guardSleepTimes[currGuard][inputInfo.month] = [];
        if (!guardSleepTimes[currGuard][inputInfo.month][inputInfo.day]) guardSleepTimes[currGuard][inputInfo.month][inputInfo.day] = [];
        let day = guardSleepTimes[currGuard][inputInfo.month][inputInfo.day];
        let minutes = getInfo(inputArray[i+1]).minute - inputInfo.minute;
        for (let i=0; i < minutes; i++) {
            day[inputInfo.minute + i] = true;
            if (!guardSleepTimeTotals[currGuard]) guardSleepTimeTotals[currGuard] = 1;
            else guardSleepTimeTotals[currGuard] += 1;
        }
    }
}

let highestSleepTimeGuard;
for (let i=0; i < guardIDs.length; i++) {
    let guard = guardSleepTimeTotals[guardIDs[i]];
    if (!highestSleepTimeGuard || guard > highestSleepTimeGuard.sleeptime) {
        highestSleepTimeGuard = {
            id: guardIDs[i],
            sleeptime: guard
        }
    }
}

let minuteMostOftenSlept = {};
let guard = guardSleepTimes[highestSleepTimeGuard.id];
for (let i=0; i < guard.length; i++) {
    let month = guard[i];
    if (!month) continue;
    for (let i=0; i < month.length; i++) {
        let day = month[i];
        if (!day) continue;
        for (let i=0; i < day.length; i++) {
            let minute = day[i];
            if (minute) {
                if (minuteMostOftenSlept[i]) minuteMostOftenSlept[i] += 1;
                else minuteMostOftenSlept[i] = 1;
            }
        }
    }
}

let theMinute;
for (let [key, val] of Object.entries(minuteMostOftenSlept)) {
    if (!theMinute || val > theMinute.occurences) {
        theMinute = {
            minute: key,
            occurences: val
        }
    }
}

//---------------------------------------------------------------------------------------

let mostConsistentAsleepGuards = {}
for (let i=0; i < guardIDs.length; i++) {
    let guard = guardSleepTimes[guardIDs[i]];
    let guardID = guardIDs[i];
    if (!guard) continue;
    if (!mostConsistentAsleepGuards[guardID]) mostConsistentAsleepGuards[guardID] = {};
    for (let i=0; i < guard.length; i++) {
        let month = guard[i];
        if (!month) continue;
        for (let i=0; i < month.length; i++) {
            let day = month[i];
            if (!day) continue;
            for (let i=0; i < day.length; i++) {
                let minute = day[i];
                if (minute) {
                    if (mostConsistentAsleepGuards[guardID][i]) mostConsistentAsleepGuards[guardID][i] += 1;
                    else mostConsistentAsleepGuards[guardID][i] = 1;
                }
            }
        }
    }
}

let theSecondMinute;
for (let [key, val] of Object.entries(mostConsistentAsleepGuards)) {
    let guard = key;
    let minutes = val;
    for (let [key, val] of Object.entries(minutes)) {
        if (!theSecondMinute || val > theSecondMinute.occurences) {
            theSecondMinute = {
                minute: key,
                guard: guard,
                occurences: val
            }
        }
    }
}


let timeElapsed = Date.now() - startTime;

console.log(theMinute.minute * highestSleepTimeGuard.id);
console.log(theSecondMinute.minute * theSecondMinute.guard)
console.log(`Took ${timeElapsed}ms`);