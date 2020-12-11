const solve = async function(part) {
  const file = require(`../day10/INPUTS.json`)

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
  let oneDiff = 0
  let threeDiff = 0
  inputArray.sort((a, b) => a - b)
  inputArray = inputArray.map((el) => parseInt(el))
  inputArray.push(inputArray[inputArray.length - 1] + 3)
  inputArray.forEach((adapter, i) => {
    let diff = 0
    if(i == 0) { 
      diff = adapter 
    } else {
      diff = adapter - inputArray[i - 1]
    }
    if(diff == 1) {
      oneDiff++
    } else if(diff == 3) {
      threeDiff++
    }
  })
  return oneDiff * threeDiff
}

const solve2 = function(inputArray) {
  console.log(inputArray)
}



export default solve;
