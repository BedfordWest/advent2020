const solve = async function(part) {
  const file = require(`../day13/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")
  const earliest = inputArray[0]
  const buses = inputArray[1].split(',').filter((bus) => bus != 'x')

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  console.log(buses)
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}



export default solve;
