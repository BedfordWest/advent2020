const solve = async function(part) {
  const file = require(`../day18/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  console.log(inputArray)
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

export default solve;
