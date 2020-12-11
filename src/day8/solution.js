var _ = require('lodash');
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
  for(let i = 0; i < inputArray.length; i++) {
      executeTally = executeTally.map(() => 0)
      acc = 0
      let tryAcc = swapAndRun(inputArray, i)
      if((executeTally.filter((tally) => tally > 1).length == 0) && (tryAcc != 0)) {
        return tryAcc
      }
  }  
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
    if((index + 1) == inputArray.length) {
      return acc
    }
    return executeInstruction(inputArray, index + 1)
  }
  else if(split[0] == "jmp") {
    if((index + parseInt(split[1])) >= inputArray.length) {      
      return acc
    }
    return executeInstruction(inputArray, index + parseInt(split[1]))
  }
  else {
    if((index + 1) == inputArray.length) {
      return acc
    }
    return executeInstruction(inputArray, index + 1)
  }
}

const swapAndRun = function(inputArray, index) {
  let instruction = inputArray[index]
  let split = instruction.split(' ')

  if(split[0] == 'acc') {
    return 0
  }
  let newArray = _.cloneDeep(inputArray)
  if(split[0] == 'jmp') {
    newArray[index] = newArray[index].replace('jmp', 'nop')
  } else if(split[0] == 'nop') {
    newArray[index] = newArray[index].replace('nop', 'jmp')
  }
  return executeInstruction(newArray, 0)
}

export default solve;
