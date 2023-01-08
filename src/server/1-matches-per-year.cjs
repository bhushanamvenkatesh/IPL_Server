function matchesPerYear(matchObj) {
  let matchesPerYear = matchObj.reduce((matchesPerYearObj, eachMatch) => {
    if (matchesPerYearObj.hasOwnProperty(eachMatch.season)) {
      matchesPerYearObj[eachMatch.season] = matchesPerYearObj[eachMatch.season] + 1;
    } else {
      matchesPerYearObj[eachMatch.season] = 1;
    }

    return matchesPerYearObj;
  }, {});

  return matchesPerYear;
}

module.exports = matchesPerYear;
