var facing = 0
var position = [0,0]
var wayPosition = [10,1]

const solve = async function(part) {
  const file = require(`../day12/INPUTS.json`)
  facing = 0
  position = [0,0]
  wayPosition = [10,1]

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
  facing = getAngle()
  inputArray.forEach(instruction => {
    let command = parseInstruction(instruction)
    performWPAction(command)
  })
  return Math.abs(position[0]) + Math.abs(position[1])
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
    case 'L':
      facing = (facing + value) % 360
      break
    case 'R':
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

const updateWayPosition = function() {
    let mag = Math.hypot(wayPosition[0], wayPosition[1])
    let radFacing = facing * (Math.PI/180)
    wayPosition[0] = mag * Math.cos(radFacing)
    wayPosition[1] = mag * Math.sin(radFacing)
}

const performWPAction = function(instruction) {
  let command = instruction[0]
  let value = instruction[1]
  switch(command) {
    case 'L':
      facing = (facing + value) % 360
      updateWayPosition()
      break
    case 'R':
      facing = (facing - value) % 360
      if(facing < 0) {
        facing += 360
      }
      updateWayPosition()
      break
    case 'F':
      position[0] += value * wayPosition[0]
      position[1] += value * wayPosition[1]
      break
    case 'N':
      wayPosition[1] += value
      facing = getAngle()
      break
    case 'E':
      wayPosition[0] += value
      facing = getAngle()
      break
    case 'S':
      wayPosition[1] -= value
      facing = getAngle()
      break
    case 'W':
      wayPosition[0] -= value
      facing = getAngle()
      break
    }
}

const getAngle = function() {
  let angle = Math.atan2(wayPosition[1], wayPosition[0]) * (180 / Math.PI);
  if(angle < 0) {
    angle += 360
  }
  return angle
}

export default solve;
