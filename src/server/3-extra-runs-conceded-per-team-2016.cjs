function extraRunsConcededPerTeamIn2016(matchObj, deliveriesObj, year) {
  let requiredYearIds = matchObj
    .filter((eachItem) => eachItem.season == year)
    .map((eachItem) => eachItem.id);

  let requiredYeardeliveries = deliveriesObj
  .filter((eachItem) =>{
    return requiredYearIds.includes(eachItem.match_id)
  }
  );

  let extraRuns = requiredYeardeliveries
  .reduce((runsObj, currentItem) => {
    if (runsObj[currentItem.bowling_team]) {
      runsObj[currentItem.bowling_team] =runsObj[currentItem.bowling_team] + parseInt(currentItem.extra_runs);
    } else {
      runsObj[currentItem.bowling_team] = parseInt(currentItem.extra_runs);
    }

    return runsObj;
  }, {});

  return extraRuns;
}

module.exports = extraRunsConcededPerTeamIn2016;
