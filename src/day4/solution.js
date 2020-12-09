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
    if(checkValidity(passport, 1)) {
      valid++
    }
  })
  return valid
}

const solve2 = function(inputArray) {    
  var valid = 0
  inputArray.forEach(passport => {
    if(checkValidity(passport, 2)) {
      valid++
    }
  })
  return valid
}

const checkValidity = function(passport, part) {
  var entries = passport.split(/[\s]+/)

  var entryCounts = {
    byr: {count: 0, actionFunc: byrValidity},
    iyr: {count: 0, actionFunc: iyrValidity},
    eyr: {count: 0, actionFunc: eyrValidity},
    hgt: {count: 0, actionFunc: hgtValidity},
    hcl: {count: 0, actionFunc: hclValidity},
    ecl: {count: 0, actionFunc: eclValidity},
    pid: {count: 0, actionFunc: pidValidity},
    cid: {count: 0, actionFunc: cidValidity},
  }

  const entryValid = function(key, value) {
    return entryCounts[key]["actionFunc"](value)
  }

  for (var entry of entries) {
    var splitEntry = entry.split(":")
    const key = splitEntry[0]
    const value = splitEntry[1]
    entryCounts[key]["count"]++
    if(part == 2) {
      if(!entryValid(key, value)) {
        return false
      }
    }
  }

  var filtered = _.pickBy(entryCounts, function(val) {
    return val["count"] < 1;
  })

  if(Object.keys(filtered).length > 1) { return false }
  if((Object.keys(filtered).length == 1) && (entryCounts["cid"]["count"] > 0)) { return false }
  return true;
}

const byrValidity = function(entry) {
  if(!isNumeric(entry)) { return false }
  entry = parseInt(entry)
  if((entry < 1920) || (entry > 2002)) { return false }
  return true
}

const iyrValidity = function(entry) {
  if(!isNumeric(entry)) { return false }
  entry = parseInt(entry)
  if((entry < 2010) || (entry > 2020)) { return false }
  return true  
}

const eyrValidity = function(entry) {
  if(!isNumeric(entry)) { return false }  
  entry = parseInt(entry)
  if((entry < 2020) || (entry > 2030)) { return false }
  return true  
}

const hgtValidity = function(entry) {
  if(entry.length < 3) { return false }
  entry = entry.split('')
  var type = []
  type.push(entry.pop())
  type.push(entry.pop())
  type.reverse()

  type = type.join('')
  entry = entry.join('')

  if(!isNumeric(entry)) { return false }
  entry = parseInt(entry)

  if(type == "cm") {
    if((entry < 150) || (entry > 193)) { return false }
    return true
  }
  else if(type == "in") {
    if((entry < 59) || (entry > 76)) { return false }
    return true
  }
  return false
}

const hclValidity = function(entry) {
  if(entry.length != 7) { return false }
  entry = entry.split('')

  if(entry.shift() != '#') { return false }
  const valid = "abcdefg0123456789"
  entry.forEach(char => {
    if(!valid.includes(char)) { return false }
  })
  return true
}

const eclValidity = function(entry) {
  const valid = "amb blu brn gry grn hzl oth".split(" ")
  if(!valid.includes(entry)) { return false }
  return true
}

const pidValidity = function(entry) {
  if(!isNumeric(entry)) { return false }
  if(entry.length != 9) { return false }
  entry = parseInt(entry)
  return true
}

const cidValidity = function(entry) {
  return true  
}

const isNumeric = function(value) {
  return /^-?\d+$/.test(value);
}

export default solve;
