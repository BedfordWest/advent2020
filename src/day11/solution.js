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
  let changes = 1
    while(changes > 0) {
    let step = stepMap(inputArray)
    inputArray = step[1]
    changes = step[0]
  }
  return countSeats(inputArray)
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const stepMap = function(map) {
  let clone = _.cloneDeep(map)
  let changes = 0
  for(let x = 0; x < map[0].length; x++) {
    for(let y = 0; y < map.length; y++) {
      let val = map[y][x]
      if(val == '#') {
        if(shouldEmpty(clone, [x,y])) {
          map[y][x] = 'L'
          changes++
        }
      } else if(val == 'L') {
        if(shouldFill(clone, [x,y])) {
          map[y][x] = '#'
          changes++
        }
      }
    }
  }
  return [changes, map]
}

const shouldEmpty = function(currentSeats, location) {
  let filledNeighbors = countFilled(currentSeats, location)

  if(filledNeighbors >= 4) {
    return true
  } else {
    return false
  }
}

const shouldFill = function(currentSeats, location) {
  let filledNeighbors = countFilled(currentSeats, location)
  if(filledNeighbors == 0) {
    return true
  } else {
    return false
  }
}

const countFilled = function(currentSeats, location) {
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
