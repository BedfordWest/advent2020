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
  let sample = 59
  sample = sample.toString(2)
  while(sample.length < 36) {
    sample = '0' + sample
  }
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
  console.log(inputArray)
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

const toBinary = function(val) {
  val = parseInt(val).toString(2)
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

export default solve;
