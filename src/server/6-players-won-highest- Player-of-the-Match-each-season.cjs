function playersWonHighestPlayersOfTheMatchEachSeason(matchesData) {
  let playerOfTheMatchesRes = matchesData
    .map((eachMatch) => {
      return { season: eachMatch.season, player_of_match: eachMatch.player_of_match, };
    })
    .reduce((seasonObj, eachSeasonObj) => {
      if (seasonObj[eachSeasonObj.season] && seasonObj[eachSeasonObj.season][eachSeasonObj.player_of_match]) {
        seasonObj[eachSeasonObj.season][eachSeasonObj.player_of_match] += 1;

      } else if (seasonObj[eachSeasonObj.season] == undefined) {

        seasonObj[eachSeasonObj.season] = {};
        seasonObj[eachSeasonObj.season][eachSeasonObj.player_of_match] = 1;
      } else {
        seasonObj[eachSeasonObj.season][eachSeasonObj.player_of_match] = 1;
      }

      return seasonObj;
    }, {});

  let playersList = Object.entries(playerOfTheMatchesRes)
  .map((eachItem) => {
    return [eachItem[0], Object.entries(eachItem[1]).sort((playerObj1, playerObj2) => playerObj2[1] - playerObj1[1])[0],];
  });

  return Object.fromEntries(playersList);
}

module.exports = playersWonHighestPlayersOfTheMatchEachSeason;
