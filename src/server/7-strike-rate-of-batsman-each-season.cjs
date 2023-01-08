function strikeRateOfBatsMenEachSeason(matchesData, deliveriesData, nameOfBatsMen) {

  const seasonAndMatchIds = matchesData.reduce((seasonObj, eachMatch) => {

    if (seasonObj[eachMatch.season]) {
      seasonObj[eachMatch.season].push(eachMatch.id);
    } else {
      seasonObj[eachMatch.season] = [];
      seasonObj[eachMatch.season].push(eachMatch.id);
    }

    return seasonObj;
  }, {});

  let eachSeasonData = Object.keys(seasonAndMatchIds).reduce((playerObj, eachSeason) => {

    playerObj[eachSeason] = deliveriesData
      .filter((eachDelivery) => {
        return seasonAndMatchIds[eachSeason].includes(eachDelivery.match_id);
      })
      .reduce((playerBattingDetails, eachDelivery) => {
        if (playerBattingDetails[eachDelivery.batsman]) {
          playerBattingDetails[eachDelivery.batsman]["totalRuns"] += parseInt(eachDelivery.batsman_runs);
          playerBattingDetails[eachDelivery.batsman]["totalBalls"] += 1;
          playerBattingDetails[eachDelivery.batsman]["strikeRate"] = Math.ceil(parseInt((playerBattingDetails[eachDelivery.batsman]["totalRuns"] / playerBattingDetails[eachDelivery.batsman]["totalBalls"]) * 100));
        } else {

          playerBattingDetails[eachDelivery.batsman] = {
            totalRuns: parseInt(eachDelivery.batsman_runs),
            totalBalls: 1,
            strikeRate: parseInt(eachDelivery.batsman_runs),
          };
        }

        if (parseInt(eachDelivery.wide_runs) > 0) {
          playerBattingDetails[eachDelivery.batsman]["totalBalls"] -= 1;
        }

        return playerBattingDetails;
      }, {});

    return playerObj;
  }, {}
  );

  let requiredPlayerStrikeRate = Object.entries(eachSeasonData)
    .map((seasonObj) => {
      return [seasonObj[0], Object.entries(seasonObj[1])
        .reduce((strikeRateData, playerScoreDetails) => {

          if (playerScoreDetails[0] == nameOfBatsMen) {

            strikeRateData[playerScoreDetails[0]] = Object.entries(playerScoreDetails[1]);
          }

          return strikeRateData;
        }, {}),
      ];
    }
    );

  return Object.fromEntries(requiredPlayerStrikeRate)
}

module.exports = strikeRateOfBatsMenEachSeason;
