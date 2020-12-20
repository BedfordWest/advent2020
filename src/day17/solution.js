const _ = require('lodash')

const solve = async function(part) {
  const file = require(`../day17/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r").map((row) => {
    return row.split('')
  })

  var inputWorld = [_.cloneDeep(inputArray)]  

  if(part == 1) {
      return solve1(inputWorld)
  }
  else {
      return solve2(inputWorld)
  }
}

const solve1 = function(inputWorld) {
  for(let i = 0; i < 6; i++) {
    advanceCycle(inputWorld)
  }
  return countActive(inputWorld)
}

const solve2 = function(inputWorld) {    
  console.log(inputWorld)
}

const advanceCycle = function(inputWorld) {
  extendWorld(inputWorld)
  mutateWorld(inputWorld)
}

const extendWorld = function(inputWorld) {
  let height = inputWorld[0].length + 2
  let width = inputWorld[0][0].length + 2
  let depth = inputWorld.length

  // Extend existing rows
  for(let z = 0; z < depth; z++) {
    for(let y = 0; y < height - 2; y++) {
      inputWorld[z][y].push('.')
      inputWorld[z][y].unshift('.')
    }
  }

  // Create a new row of empty cubes
  let newArray = []
  for(let i = 0; i < width; i++) {
    newArray.push('.')
  }
  
  // Extend out the rows on existing slices
  for(let k = 0; k < depth; k++) {
    inputWorld[k].push(_.cloneDeep(newArray))
    inputWorld[k].unshift(_.cloneDeep(newArray))
  }

  // Create new z-slices of empty cube rows  
  let newSlice = []
  for(let j = 0; j < height; j++) {
    newSlice.push(_.cloneDeep(newArray))
  }
  inputWorld.push(_.cloneDeep(newSlice))
  inputWorld.unshift(_.cloneDeep(newSlice))

  return inputWorld
}

const mutateWorld = function(inputWorld) {
  let copy = _.cloneDeep(inputWorld)
  let neighbors = 0
  for(let z = 0; z < inputWorld.length; z++) {
    for(let y = 0; y < inputWorld[0].length; y++) {
      for(let x = 0; x < inputWorld[0][0].length; x++) {
        neighbors = countNeighbors(z, y, x, copy)
        if(inputWorld[z][y][x] == '#') {
          if((neighbors < 2) || (neighbors > 3)) {
            inputWorld[z][y][x] = '.'
          }
        } else {
          if(neighbors == 3) {
            inputWorld[z][y][x] = '#'
          }
        }
      }
    }
  }
  return inputWorld
}

const countNeighbors = function(z, y, x, copy) {
  let neighbors = 0
  for(let zN = z - 1; zN <= z + 1; zN++) {
    if((zN < 0) || (zN > copy.length - 1)) {
      continue
    }
    for(let yN = y - 1; yN <= y + 1; yN++) {
      if((yN < 0) || (yN > copy[0].length - 1)) {
        continue
      }
      for(let xN = x - 1; xN <= x + 1; xN++) {
        if((xN < 0) || (xN > copy[0][0].length - 1)) {
          continue
        }
        if((xN == x) && (yN == y) && (zN == z)) { 
          continue 
        }
        if(copy[zN][yN][xN] == '#') {
          neighbors++
        }
      }
    }
  }
  return neighbors
}

const countActive = function(inputWorld) {
  let active = 0
  for(let z = 0; z < inputWorld.length; z++) {
    for(let y = 0; y < inputWorld[0].length; y++) {
      for(let x = 0; x < inputWorld[0][0].length; x++) {
        if(inputWorld[z][y][x] == '#') {
          active++
        }
      }
    }
  }
  return active
}

export default solve;
