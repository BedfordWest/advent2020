const solve = async function(part) {
  const file = require(`../day15/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split(",").map((el) => parseInt(el))

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  let start = inputArray.length
  for(let i = start; i < 2020; i++) {
    evaluateCurrent(inputArray)
  }
  return inputArray[2019]
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const evaluateCurrent = function(inputArray) {
  let current = inputArray[inputArray.length - 1]
  let found = false
  for(let i = inputArray.length - 2; i >= 0; i--) {
    if(inputArray[i] == current) {
      current = inputArray.length - 1 - i
      found = true
      break
    }
  }
  if(!found) {
    current = 0
  }
  inputArray.push(current)
}

export default solve;
