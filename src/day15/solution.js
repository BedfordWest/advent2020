var foundAts = {}

const solve = async function(part) {
  const file = require(`../day15/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split(",").map((el) => parseInt(el))
  foundAts = {}
  for(let i = 0; i < inputArray.length - 1; i++) {
    foundAts[inputArray[i]] = i
  }

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {  
  let start = inputArray.length
  let final = 0
  let current = inputArray[start - 1]
  for(let i = start; i < 2020; i++) {
    final = evaluateCurrent(current, i)
    current = final
  }
  console.log(final)
  return final
}

const solve2 = function(inputArray) {
  let start = inputArray.length
  let final = 0
  let current = inputArray[start - 1]
  for(let i = start; i < 30000000; i++) {
    final = evaluateCurrent(current, i)
    current = final
  }
  return final
}

const evaluateCurrent = function(current, iteration) {
  let next = 0
  if(Object.prototype.hasOwnProperty.call(foundAts, current)) {
    next = (iteration - 1 - parseInt(foundAts[current]))
    foundAts[current] = iteration - 1
  } else {
    foundAts[current] = iteration - 1
  }
  return next
}

export default solve;
