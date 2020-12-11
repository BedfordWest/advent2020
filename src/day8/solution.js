var acc = 0
var executeTally = []

const solve = async function(part) {
  const file = require(`../day8/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")
  for (let i = 0; i < inputArray.length; i++) {
    executeTally.push(0)
  }

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  return executeInstruction(inputArray, 0)
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const executeInstruction = function(inputArray, index) {
  executeTally[index]++
  if(executeTally[index] == 2)  {   
    return acc
  }
  let instruction = inputArray[index]
  let split = instruction.split(' ')
  if(split[0] == "acc") {
    acc += parseInt(split[1])
    return executeInstruction(inputArray, index + 1)
  }
  else if(split[0] == "jmp") {
    return executeInstruction(inputArray, index + parseInt(split[1]))
  }
  else {
    return executeInstruction(inputArray, index + 1)
  }
}

export default solve;
