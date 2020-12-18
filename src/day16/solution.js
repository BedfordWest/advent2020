var fieldRanges = []
var invalids = []

const solve = async function(part) {
  const file = require(`../day16/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r\n\r")
  fieldRanges = []
  invalids = []
  const fieldArray = inputArray[0].split("\n\r")
  const nearByArray = inputArray[2].split("\n\r").slice(1)

  if(part == 1) {
      return solve1(fieldArray, nearByArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(fieldArray, nearByArray) {
  parseFields(fieldArray)
  findInvalids(nearByArray)
  let sum = invalids.reduce((a,b) => a + b)
  return sum
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const parseFields = function(fieldArray) {
  return fieldArray.forEach((field) => {
    let fieldSplit = field.split(': ')
    let rangeSplit = fieldSplit[1].split(' or ')
    let minMax1 = rangeSplit[0].split('-')
    let minMax2 = rangeSplit[1].split('-')
    fieldRanges.push([fieldSplit[0], 
      parseInt(minMax1[0]), 
      parseInt(minMax1[1]), 
      parseInt(minMax2[0]), 
      parseInt(minMax2[1])])
  })
}

const findInvalids = function(nearByArray) {
  nearByArray.forEach((vals) => {
    vals = vals.split(",").map((valStr) => parseInt(valStr))
    vals.forEach((val) => {
      if(!inFieldRanges(val)) {
        invalids.push(val)
      }
    })
  })
}

const inFieldRanges = function(val) {
  for(let i = 0; i < fieldRanges.length; i++) {
    if(((val >= fieldRanges[i][1]) && (val <= fieldRanges[i][2])) ||
       ((val >= fieldRanges[i][3]) && (val <= fieldRanges[i][4]))) {
      return true
    }
  }
  return false
}

export default solve;
