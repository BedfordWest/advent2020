const solve = async function(part) {
  const file = require(`../day3/INPUTS.json`)

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

}

const solve2 = function(inputArray) {    

}

export default solve;
