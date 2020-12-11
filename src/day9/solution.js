var added = []

const solve = async function(part) {
  const file = require(`../day9/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r").map((el) => parseInt(el))

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  for(let i = 25; i < inputArray.length; i++) {
    let slice = inputArray.slice(i - 25, i)
    if(!checkInput(slice, inputArray[i])) {
      return inputArray[i]
    }
  }
}

const solve2 = function(inputArray) {
  let invalid = solve1(inputArray)
  tryToSolve(inputArray, invalid)
  added.sort((a, b) => a - b)
  return added[0] + added[added.length - 1]  
}

const checkInput = function(slice, current) {
  return slice.some((el) => {
    let copy = [...slice]
    copy.splice(copy.indexOf(el), 1)
    return copy.some((innerEl) => {
      return (innerEl + el == current)
    })
  })
}

const tryToSolve = function(inputArray, invalid) {
  for(let i = 0; i < (inputArray.length - 1); i++) {
    added = []
    if(inputArray[i] >= invalid) {
      continue
    } else {
      added.push(inputArray[i])
      if(recursiveAdd(inputArray, i, inputArray[i], invalid)) {
        break
      }
    }
  }
}

const recursiveAdd = function(inputArray, index, currentSum, invalid) {
  if(inputArray[index + 1] >= invalid) { 
    return false 
  }
  currentSum += inputArray[index + 1]
  added.push(inputArray[index + 1])
  if(currentSum == invalid) {
    return true
  }
  return recursiveAdd(inputArray, index + 1, currentSum, invalid)
}

export default solve;
