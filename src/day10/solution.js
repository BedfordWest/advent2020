const solve = async function(part) {
  const file = require(`../day10/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")
  inputArray.sort((a, b) => a - b)
  inputArray = inputArray.map((el) => parseInt(el))
  inputArray.push(inputArray[inputArray.length - 1] + 3)
  inputArray.unshift(0)

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
  const skips = []
  console.log(inputArray)
  inputArray.forEach((adapter, i) => {
    var diff = 0
    if(i != 0) {
      diff = adapter - inputArray[i - 1]
      skips.push(diff)
    }
  })

  var numOnes = []
  var oneCounter = 0
  for(let j = 0; j < skips.length; j++) {
    if(skips[j] == 1) {
      oneCounter++
    } else {
      numOnes.push(oneCounter)
      oneCounter = 0
    }
  }

  let total =  numOnes.reduce((acc,curr) => {  
    if(curr < 2) {
      return acc
    } else if(curr == 2) {
      return acc * 2
    }
    else if(curr == 3) {
      return acc * 4
    }
    else if(curr == 4) {
      return acc * 7
    }
  }, 1)
  return total
  
}

export default solve;
