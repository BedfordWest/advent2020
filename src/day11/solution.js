var _ = require('lodash');

const solve = async function(part) {
  const file = require(`../day11/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")
  inputArray = inputArray.map(row => row.split(''))

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  return stabilizeMap(inputArray, false)
}

const solve2 = function(inputArray) {    
  return stabilizeMap(inputArray, true)
}

const stabilizeMap = function(inputArray, repeatFlag) {
  let changes = 1
  while(changes > 0) {
  let step = stepMap(inputArray, repeatFlag)
  inputArray = step[1]
  changes = step[0]
  }
  return countSeats(inputArray)  
}

const stepMap = function(map, repeatFlag) {
  let clone = _.cloneDeep(map)
  let changes = 0
  for(let x = 0; x < map[0].length; x++) {
    for(let y = 0; y < map.length; y++) {
      let val = map[y][x]
      if(val == '#') {
        if(shouldEmpty(clone, [x,y], repeatFlag)) {
          map[y][x] = 'L'
          changes++
        }
      } else if(val == 'L') {
        if(shouldFill(clone, [x,y], repeatFlag)) {
          map[y][x] = '#'
          changes++
        }
      }
    }
  }
  return [changes, map]
}

const shouldEmpty = function(currentSeats, location, repeatFlag) {
  let filledNeighbors = countFilled(currentSeats, location, repeatFlag)

  let limit = repeatFlag ? 5 : 4

  if(filledNeighbors >= limit) {
    return true
  } else {
    return false
  }
}

const shouldFill = function(currentSeats, location, repeatFlag) {
  let filledNeighbors = countFilled(currentSeats, location, repeatFlag)
  if(filledNeighbors == 0) {
    return true
  } else {
    return false
  }
}

const countFilled = function(currentSeats, location, repeatFlag) {  

  return repeatFlag ? countFilledRepeat(currentSeats, location) : countFilledSingle(currentSeats, location)
}

const countFilledSingle = function(currentSeats, location) {
  let filledNeighbors = 0

  for(let x = location[0] - 1; x < location[0] + 2; x++) {
    for(let y = location[1] - 1; y < location[1] + 2; y++) {
      if((x == -1) || 
        (x == currentSeats[0].length) || 
        (y == -1) || 
        (y == currentSeats.length) || 
        (x == location[0] && y == location[1])) 
      {
        continue;
      } else {
        if(currentSeats[y][x] == '#') {
          filledNeighbors++
        }
      }
    }
  }
  return filledNeighbors
}

const countFilledRepeat = function(currentSeats, location) {
  let filledNeighbors = 0
  let directionTracker = {
    N: [false, 0, 1],
    NE: [false, 1, 1],
    E: [false, 1, 0],
    SE: [false, 1, -1],
    S: [false, 0, -1],
    SW: [false, -1, -1],
    W: [false, -1, 0],
    NW: [false, -1, 1]
  }

  let tracker = null
  for(let direction in directionTracker) {
    tracker = _.cloneDeep(location)
    while(!directionTracker[direction][0]) {
      tracker[0] += directionTracker[direction][1]
      tracker[1] += directionTracker[direction][2]
      if((tracker[0] == -1) || 
        (tracker[0] == currentSeats[0].length) || 
        (tracker[1] == -1) || 
        (tracker[1] == currentSeats.length)) 
      {
        directionTracker[direction][0] = true
        continue
      }
      let val = currentSeats[tracker[1]][tracker[0]]
      if((val == '#')) {
        filledNeighbors++
        directionTracker[direction][0] = true
        continue
      } else if((val == 'L')) {
        directionTracker[direction][0] = true
        continue
      }
    }
  }
  return filledNeighbors
}

const countSeats = function(map) {
  let occupied = 0
  for(let x = 0; x < map[0].length; x++) {
    for(let y = 0; y < map.length; y++) {
      let val = map[y][x]
      if(val == '#') {
        occupied++
      }
    }
  }
  return occupied
}

export default solve;
