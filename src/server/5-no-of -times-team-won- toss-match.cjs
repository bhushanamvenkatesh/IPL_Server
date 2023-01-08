function noOfTimesEachMatchTossOwnAndMatchWon(matchesobject) {

  let eachTeamTossandmatchOwnData = matchesobject.reduce((teamsDataObj, eachMatch) => {

    if (eachMatch.toss_winner == eachMatch.winner) {

      if (teamsDataObj[eachMatch.winner]) {
        teamsDataObj[eachMatch.winner] += 1;
      } else {
        teamsDataObj[eachMatch.winner] = 1;
      }
    }

    return teamsDataObj;
  }, {});

  return eachTeamTossandmatchOwnData;
}

module.exports = noOfTimesEachMatchTossOwnAndMatchWon;
