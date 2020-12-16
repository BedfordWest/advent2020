var mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
var memories = {}

const solve = async function(part) {
  const file = require(`../day14/INPUTS.json`)

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
  inputArray.forEach((instruction) => {
    parseInstruction(instruction)
  })

  let sum = 0
  for(let entry in memories) {
    sum += fromBinary(memories[entry])
  }
  return sum
}

const solve2 = function(inputArray) {    
  inputArray.forEach((instruction) => {
    parseInstructionFloating(instruction)
  })

  let sum = 0
  for(let entry in memories) {
    sum += memories[entry]
  }
  return sum
}

const parseInstruction = function(instruction) {
  let parsed = instruction.split(' = ')
  if(parsed[0] == "mask") {
    mask = parsed[1]
  } else {
    let mem = parsed[0].match(/\d+/)    
    let memVal = applyMask(parsed[1])
    memories[mem] = memVal
  }
}

const parseInstructionFloating = function(instruction) {
  let parsed = instruction.split(' = ')
  if(parsed[0] == "mask") {
    mask = parsed[1]
  } else {
    let mem = parsed[0].match(/\d+/)    
    let memVal = parsed[1]
    applyMemories(mem, memVal)
  }
}

const toBinary = function(val) {
  val = parseInt(val, 10).toString(2)
  while(val.length < 36) {
    val = '0' + val
  }
  return val
}

const fromBinary = function(val) {
  val = parseInt(val, 2)
  return val
}

const applyMask = function(val) {
  val = toBinary(val)
  let maskStr = mask.split('')
  let valStr = val.split('')

  valStr = valStr.map((dig, i) => {
    if(maskStr[i] != 'X') {
      return maskStr[i]
    } else { return valStr[i] }
  })
  return valStr.join('')
}

const applyMemories = function(memory, val) {
  memory = toBinary(memory)
  let maskStr = mask.split('')
  let memStr = memory.split('')

  console.log(memory)
  console.log(mask)

  memStr = memStr.map((_, i) => {
    if(maskStr[i] != '0') {
      return maskStr[i]
    } else { return memStr[i] }
  })

  console.log(memStr.join(''))

  let xLocs = []
  memStr.forEach((dig, i) => {
    if(dig == 'X') {
      xLocs.push(memStr.length - i - 1)
    }
  })

  let startVal = fromBinary(memStr.map((dig) => {
    if(dig == 'X') {
      return '0'
    } else { return dig }
  }))

  let memVals = [startVal]
  let allMems = addRecursive(memVals, xLocs)

  console.log(allMems)

  console.log(memories)

  allMems.forEach((mem) => {
    memories[mem] = parseInt(val, 10)
  })

  console.log(memories)
}

const addRecursive = function(storedVals, remaining) {
  if(remaining.length == 0) {
    return storedVals
  }
  let iMax = storedVals.length
  for(let i = 0; i < iMax; i++) {
    storedVals.push(storedVals[i] + Math.pow(2, remaining[0]))
  }
  return addRecursive(storedVals, remaining.slice(1))
}


export default solve;
