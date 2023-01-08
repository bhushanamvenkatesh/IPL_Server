const fs = require("fs");

function econoicalBowlersInSuperOver(deliveriesObj) {

  let bowlersList = deliveriesObj.reduce((bowlersObj, eachItem) => {
    if (eachItem.is_super_over !== "0") {
      if (bowlersObj[eachItem.bowler]) {
        bowlersObj[eachItem.bowler]["balls"] += 1;
        bowlersObj[eachItem.bowler]["runs"] += parseInt(eachItem.total_runs);
      } else {
        bowlersObj[eachItem.bowler] = {};
        bowlersObj[eachItem.bowler]["balls"] = 1;
        bowlersObj[eachItem.bowler]["runs"] = parseInt(eachItem.total_runs);
      }
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

  return sortedBowlersList[0]
}

module.exports = econoicalBowlersInSuperOver;
