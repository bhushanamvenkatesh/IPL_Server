function matchesWonperTeamPerYear(data) {
  let res = data.reduce((matchesOwnPerTeam, eachItem) => {

    if (matchesOwnPerTeam[eachItem.winner] && matchesOwnPerTeam[eachItem.winner][eachItem.season] != undefined) {
      matchesOwnPerTeam[eachItem.winner][eachItem.season] += 1;
    } else if (matchesOwnPerTeam[eachItem.winner] == undefined) {
      matchesOwnPerTeam[eachItem.winner] = {};
      if (matchesOwnPerTeam[eachItem.winner][eachItem.season] == undefined) {
        matchesOwnPerTeam[eachItem.winner][eachItem.season] = 1;
      }
    } else {
      matchesOwnPerTeam[eachItem.winner][eachItem.season] = 1;
    }

    return matchesOwnPerTeam;
  }, {});

  return res;
}

module.exports = matchesWonperTeamPerYear;
