var facing = 0
var position = [0,0]

const solve = async function(part) {
  const file = require(`../day12/INPUTS.json`)

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
  inputArray.forEach(instruction => {
    let command = parseInstruction(instruction)
    performAction(command)
  })
  return Math.abs(position[0]) + Math.abs(position[1])
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const parseInstruction = function(instruction) {
  let command = instruction[0]
  let value = parseInt(instruction.slice(1))

  return [command, value]
}

const performAction = function(instruction) {
  let command = instruction[0]
  let value = instruction[1]
  switch(command) {
    case 'R':
      facing = (facing + value) % 360
      break
    case 'L':
      facing = (facing - value) % 360
      if(facing < 0) {
        facing = 360 + facing
      }
      break
    case 'F':
      var xMult = 0
      var yMult = 0
      switch(facing) {
      // 0 is start facing of East
      case 0:
        xMult = 1
        break
      case 90:
        yMult = -1
        break
      case 180:
        xMult = -1
        break
      case 270:
        yMult = 1
        break
      }
      position[0] += value * xMult
      position[1] += value * yMult
      break
    case 'N':
      position[1] += value
      break
    case 'E':
      position[0] += value
      break
    case 'S':
      position[1] -= value
      break
    case 'W':
      position[0] -= value
      break
    }
}

export default solve;
