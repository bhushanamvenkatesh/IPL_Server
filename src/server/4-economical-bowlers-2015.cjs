function econoicalBowlers(matchObj, deliveriesObj, year) {
  let requiredYearIds = matchObj
    .filter((eachItem) => {
      return eachItem.season == year
    })
    .map((eachItem) => {
      return eachItem.id
    });

  let requiredYeardeliveries = deliveriesObj
    .filter((eachItem) => {
      return requiredYearIds.includes(eachItem.match_id)
    }
    );

  let bowlersList = requiredYeardeliveries.reduce((bowlersObj, eachItem) => {

    if (bowlersObj[eachItem.bowler]) {
      bowlersObj[eachItem.bowler]["balls"] += 1;
      bowlersObj[eachItem.bowler]["runs"] += parseInt(eachItem.total_runs);
    } else {
      bowlersObj[eachItem.bowler] = {};
      bowlersObj[eachItem.bowler]["balls"] = 1;
      bowlersObj[eachItem.bowler]["runs"] = parseInt(eachItem.total_runs);
    }

    return bowlersObj;
  }, {});

  let bowlersArray = Object.entries(bowlersList);

  let sortedBowlersList = bowlersArray.reduce((bowlerNames, eachItem) => {

    let economy = {};

    economy["bowlerName"] = eachItem[0];
    economy["economy"] = parseInt(eachItem[1].runs) / (parseInt(eachItem[1].balls) / 6);
    bowlerNames.push(economy);

    return bowlerNames.sort((bowler1, bowler2) => {

      return bowler1.economy - bowler2.economy

    });
  }, []);

  return sortedBowlersList.slice(0, 10);
}

module.exports = econoicalBowlers;
