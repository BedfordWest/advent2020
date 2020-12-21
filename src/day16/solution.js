const _ = require('lodash')

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
  const myArray = inputArray[1].split("\n\r").slice(1)[0].split(",").map((val) => parseInt(val))
  
  if(part == 1) {
      return solve1(fieldArray, nearByArray)
  }
  else {
      return solve2(fieldArray, nearByArray, myArray)
  }
}

const solve1 = function(fieldArray, nearByArray) {
  parseFields(fieldArray)
  findInvalids(nearByArray)
  let sum = invalids.reduce((a,b) => a + b)
  return sum
}

const solve2 = function(fieldArray, nearByArray, myArray) {
  parseFields(fieldArray)
  nearByArray = findInvalids(nearByArray)
  let orderedFields = findFields(nearByArray)
  orderedFields = singleOutFields(orderedFields).filter((field) => {
    return field[0].includes("departure")
  })
  
  let product = 1
  orderedFields.forEach((field) => {
    product *= myArray[field[1][0]]
  })
  return product
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
  return nearByArray.map((ticket) => {
    return ticket.split(",").map((valStr) => parseInt(valStr))
  }).filter((vals) => {
    for(let j = 0; j < vals.length; j++) {
      if(!inFieldRanges(vals[j])) {
        invalids.push(vals[j])
        return false
      }
    }
    return true
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

const findFields = function(nearByArray) {
  return fieldRanges.map((fRange) => {
    let possibles = []
    for(let k = 0; k < nearByArray[0].length; k++) {
      // Check each ticket to see if the value matches the field
      let filteredNears = nearByArray.filter((vals) => {
        let checkVal = vals[k]
        if(((checkVal >= fRange[1]) && (checkVal <= fRange[2])) ||
          ((checkVal >= fRange[3]) && (checkVal <= fRange[4]))) {
          return true
        } else { return false }
      })
      // Means every ticket worked for this field
      if(filteredNears.length == nearByArray.length) {
        possibles.push(k)
      }      
    }
    return [fRange[0], possibles]
  }).sort((a,b) => a[1].length - b[1].length)
}

const singleOutFields = function(fields) {
  let newFields = []
  let originalLength = fields.length
  while(newFields.length != originalLength) {
    let fieldsLen = fields.length
    for(let j = 0; j < fieldsLen; j++) {
      if(fields[j][1].length == 1) {
        let foundVal = fields[j][1][0]
        newFields.push(_.cloneDeep(fields[j]))
        fields = fields.map((innerField) => {
          let foundAt = innerField[1].indexOf(foundVal)
          innerField[1].splice(foundAt, 1)
          return innerField
        }).filter((innerField) => innerField[1].length > 0)
        break;
      }
    }
  }
  return newFields
}

export default solve;
