function highestNoOfTimesOneDismissedByOther(deliveries) {
  let dismissedData = deliveries.reduce((dismissedObj, eachDelivery) => {
    if (eachDelivery.player_dismissed) {
      if (dismissedObj[eachDelivery.bowler] && dismissedObj[eachDelivery.bowler][eachDelivery.player_dismissed]) {
        dismissedObj[eachDelivery.bowler][eachDelivery.player_dismissed] += 1;
      } else if (dismissedObj[eachDelivery.bowler] == undefined) {
        dismissedObj[eachDelivery.bowler] = {};
        dismissedObj[eachDelivery.bowler][eachDelivery.player_dismissed] = 1;
      } else {
        dismissedObj[eachDelivery.bowler][eachDelivery.player_dismissed] = 1;
      }
    }

    return dismissedObj;
  }, {});

  let highestPlayerDismissedData = Object.entries(dismissedData)
    .map((eachArray) => {
      return [eachArray[0], Object.entries(eachArray[1]).sort(([, a], [, b]) => b - a)[0],];
    }
    );

  return Object.fromEntries(highestPlayerDismissedData)
}

module.exports = highestNoOfTimesOneDismissedByOther;
