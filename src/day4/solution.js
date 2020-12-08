var _ = require('lodash');

const solve = async function(part) {
  const file = require(`../day4/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r\n\r")

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  var valid = 0
  inputArray.forEach(passport => {
    if(checkValidity(passport)) {
      valid++
    }
  })
  return valid
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const checkValidity = function(passport) {
  var entries = passport.split(/[\s]+/)

  var entryCounts = {
    byr: 0,
    iyr: 0,
    eyr: 0,
    hgt: 0,
    hcl: 0,
    ecl: 0,
    pid: 0,
    cid: 0
  }

  entries.forEach(entry => {
    var key = entry.split(":")[0]
    entryCounts[key]++
  })

  var filtered = _.pickBy(entryCounts, function(val) {
    return val < 1;
  })

  console.log(filtered)

  if(Object.keys(filtered).length > 1) { return false }
  if((Object.keys(filtered).length == 1) && (entryCounts["cid"] > 0)) { return false }
  return true;

}

export default solve;
