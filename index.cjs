const express = require("express");
const path = require("path");
const fs = require("fs");
const Papa = require("papaparse");

const serverPath = path.join(__dirname, "/src/server");
const outputPath = path.join(__dirname, "/src/public/output");
const dataPath = path.join(__dirname, "/src/data");


//Importing all module

const matchesPerYear = require(path.join(serverPath, "/1-matches-per-year.cjs"));
const matchesWonperTeamPerYear = require(path.join(serverPath, "/2-matches-won-per-team-per-year.cjs"));
const extraRunsConcededPerTeamIn2016 = require(path.join(serverPath, "/3-extra-runs-conceded-per-team-2016.cjs"));
const econoicalBowlers = require(path.join(serverPath, "/4-economical-bowlers-2015.cjs"));
const noOfTimesEachMatchTossOwnAndMatchWon = require(path.join(serverPath, "/5-no-of -times-team-won- toss-match.cjs"));
const playersWonHighestPlayersOfTheMatchEachSeason = require(path.join(serverPath, "/6-players-won-highest- Player-of-the-Match-each-season.cjs"));
const strikeRateOfBatsMenEachSeason = require(path.join(serverPath, "/7-strike-rate-of-batsman-each-season.cjs"));
const highestNoOfTimesOneDismissedByOther = require(path.join(serverPath, "/8-highest- no-of-times-one-player-dismissed-by-player.cjs"));
const econoicalBowlersInSuperOver = require(path.join(serverPath, "/9-bowler-best-economy-in-super-overs.cjs"));

//Reading input files
const matchFile = fs.readFileSync(path.join(dataPath, "/matches.csv"));
const deliveriesFile = fs.readFileSync(path.join(dataPath, "/deliveries.csv"));

// converting to csv to json using papa parse
const matchObj = Papa.parse(matchFile.toString(), { header: true }).data;
const deliveriesObj = Papa.parse(deliveriesFile.toString(), {
  header: true,
  skipEmptyLines: true,
}).data;

// calling the modules and writing result in json files
let matchesPerYearData = matchesPerYear(matchObj);

try {
  fs.writeFileSync(path.join(outputPath, "./1-matches-per-year.json"), JSON.stringify(matchesPerYearData));
} catch (err) {
  console.log(err);
}

let winResult = matchesWonperTeamPerYear(matchObj);

try {
  fs.writeFileSync(path.join(outputPath, "./2-matches-won-per-team-per-year.json"), JSON.stringify(winResult));
} catch (err) {
  console.log(err);
}

let extraRuns = extraRunsConcededPerTeamIn2016(matchObj, deliveriesObj, 2016);

try {
  fs.writeFileSync(path.join(outputPath, "./3-extra-runs-conceded-per-team-2016.json"), JSON.stringify(extraRuns));
} catch (err) {
  console.log(err);
}

let economyBowlersList = econoicalBowlers(matchObj, deliveriesObj, 2015);

try {
  fs.writeFileSync(path.join(outputPath, "./4-top-10-economy-bowlers.json"), JSON.stringify(economyBowlersList));
} catch (err) {
  console.log(err);
}

let teamsTossAndMatchWonData = noOfTimesEachMatchTossOwnAndMatchWon(matchObj);

try {
  fs.writeFileSync(path.join(outputPath, "./5-team-own-toss-match.json"), JSON.stringify(teamsTossAndMatchWonData));
} catch (err) {
  console.log(err);
}

const playerOfTheMatchDetails = playersWonHighestPlayersOfTheMatchEachSeason(matchObj);

try {
  fs.writeFileSync(path.join(outputPath, "./6-players-won-highest-player-of-the-match-season.json"), JSON.stringify(playerOfTheMatchDetails)
  );
} catch (err) {
  console.log(err);
}

let strikeRateDetails = strikeRateOfBatsMenEachSeason(matchObj, deliveriesObj, "Yuvraj Singh");

try {
  fs.writeFileSync(path.join(outputPath, "./7-strike-rate-of-batsman-each-season.json"), JSON.stringify(strikeRateDetails));
} catch (err) {
  console.log(err);
}

let dismissedData = highestNoOfTimesOneDismissedByOther(deliveriesObj);

try {
  fs.writeFileSync(path.join(outputPath, "./8-highest-no-of-times-one-dismmismissed-another-player.json"), JSON.stringify(dismissedData));
} catch (err) {
  console.log(err);
}

let econoyBowlerInSuperOver = econoicalBowlersInSuperOver(deliveriesObj);

try {
  fs.writeFileSync(path.join(outputPath, "./9-bowler-best-economy-in-super-over.json"), JSON.stringify(econoyBowlerInSuperOver));
} catch (err) {
  console.log(err);
}


let jsonDataFiles = {
  problem1: "./1-matches-per-year.json",
  problem2: "./2-matches-won-per-team-per-year.json",
  problem3: "./3-extra-runs-conceded-per-team-2016.json",
  problem4: "./4-top-10-economy-bowlers.json",
  problem5: "./5-team-own-toss-match.json",
  problem6: "./6-players-won-highest-player-of-the-match-season.json",
  problem7: "./7-strike-rate-of-batsman-each-season.json",
  problem8: "./8-highest-no-of-times-one-dismmismissed-another-player.json",
  problem9: "./9-bowler-best-economy-in-super-over.json"
}


const iplApp = express();
const port = process.env.PORT || 4000;

iplApp.use(express.static(__dirname));

iplApp.get('/', (req, res) => {
  res.status(200)
  res.sendFile(path.join(__dirname,"src/index.html"))

});

iplApp.get('/:name', (req, res) => {

  let fileName = req.params.name
  if (jsonDataFiles[fileName]) {
    res.status(200);
    res.sendFile(path.join(outputPath, jsonDataFiles[fileName]))
  } else {
    res.status(400)
    res.send("Not Found")
  }

});

iplApp.listen(port, (err) => {
  if (err) {
    console.log("server not started")
  } else {
    console.log(`server running at ${port}`)
  }
})
