const _ = require('lodash')

const solve = async function(part) {
  const file = require(`../day17/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r").map((row) => {
    return row.split('')
  })

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  var inputWorld = [_.cloneDeep(inputArray)]
  for(let i = 0; i < 6; i++) {
    advanceCycle3d(inputWorld)
  }
  return countActive3d(inputWorld)
}

const solve2 = function(inputArray) {   
  var inputZ = [_.cloneDeep(inputArray)]
  var inputWorld = [_.cloneDeep(inputZ)]  
  for(let i = 0; i < 6; i++) {
    advanceCycle(inputWorld)
  }
  return countActive(inputWorld)
}

const advanceCycle = function(inputWorld) {
  extendWorld(inputWorld)
  mutateWorld(inputWorld)
}

const advanceCycle3d = function(inputWorld) {
  extendWorld3d(inputWorld)
  mutateWorld3d(inputWorld)
}

const extendWorld = function(inputWorld) {
  let hyper = inputWorld.length
  let height = inputWorld[0][0].length + 2
  let width = inputWorld[0][0][0].length + 2
  let depth = inputWorld[0].length + 2

  // Extend existing rows
  for(let w = 0; w < hyper; w++){
    for(let z = 0; z < depth - 2; z++) {
      for(let y = 0; y < height - 2; y++) {
        inputWorld[w][z][y].push('.')
        inputWorld[w][z][y].unshift('.')
      }
    }
  }

  // Create a new row of empty cubes
  let newArray = []
  for(let i = 0; i < width; i++) {
    newArray.push('.')
  }
  
  // Extend out the rows on existing slices
  for(let l = 0; l < hyper; l++) {
    for(let k = 0; k < depth - 2; k++) {
      inputWorld[l][k].push(_.cloneDeep(newArray))
      inputWorld[l][k].unshift(_.cloneDeep(newArray))
    }
  }

  // Create new z-slices of empty cube rows  
  let newSlice = []
  for(let j = 0; j < height; j++) {
    newSlice.push(_.cloneDeep(newArray))
  }
  for(let m = 0; m < hyper; m++) {
    inputWorld[m].push(_.cloneDeep(newSlice))
    inputWorld[m].unshift(_.cloneDeep(newSlice))
  }

  // Extend out new hypers
  let newHyper = []
  for(let n = 0; n < depth; n++) {
    newHyper.push(_.cloneDeep(newSlice))
  }
  inputWorld.push(_.cloneDeep(newHyper))
  inputWorld.unshift(_.cloneDeep(newHyper))

  return inputWorld
}

const mutateWorld = function(inputWorld) {
  let copy = _.cloneDeep(inputWorld)
  let neighbors = 0
  for(let w = 0; w < inputWorld.length; w++) {
    for(let z = 0; z < inputWorld[0].length; z++) {
      for(let y = 0; y < inputWorld[0][0].length; y++) {
        for(let x = 0; x < inputWorld[0][0][0].length; x++) {
          neighbors = countNeighbors(w, z, y, x, copy)
          if(inputWorld[w][z][y][x] == '#') {
            if((neighbors < 2) || (neighbors > 3)) {
              inputWorld[w][z][y][x] = '.'
            }
          } else {
            if(neighbors == 3) {
              inputWorld[w][z][y][x] = '#'
            }
          }
        }
      }
    }
  }
  return inputWorld
}

const countNeighbors = function(w, z, y, x, copy) {
  let neighbors = 0
  for(let wN = w - 1; wN <= w + 1; wN++) {
    if((wN < 0) || (wN > copy.length - 1)){
      continue
    }
    for(let zN = z - 1; zN <= z + 1; zN++) {
      if((zN < 0) || (zN > copy[0].length - 1)) {
        continue
      }
      for(let yN = y - 1; yN <= y + 1; yN++) {
        if((yN < 0) || (yN > copy[0][0].length - 1)) {
          continue
        }
        for(let xN = x - 1; xN <= x + 1; xN++) {
          if((xN < 0) || (xN > copy[0][0][0].length - 1)) {
            continue
          }
          if((xN == x) && (yN == y) && (zN == z) && (wN == w)) {
            continue 
          }
          if(copy[wN][zN][yN][xN] == '#') {
            neighbors++
          }
        }
      }
    }
  }
  return neighbors
}

const countActive = function(inputWorld) {
  let active = 0
  for(let w = 0; w < inputWorld.length; w++) {
    for(let z = 0; z < inputWorld[0].length; z++) {
      for(let y = 0; y < inputWorld[0][0].length; y++) {
        for(let x = 0; x < inputWorld[0][0][0].length; x++) {
          if(inputWorld[w][z][y][x] == '#') {
            active++
          }
        }
      }
    }
  }
  return active
}

const extendWorld3d = function(inputWorld) {
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

const mutateWorld3d = function(inputWorld) {
  let copy = _.cloneDeep(inputWorld)
  let neighbors = 0
  for(let z = 0; z < inputWorld.length; z++) {
    for(let y = 0; y < inputWorld[0].length; y++) {
      for(let x = 0; x < inputWorld[0][0].length; x++) {
        neighbors = countNeighbors3d(z, y, x, copy)
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

const countNeighbors3d = function(z, y, x, copy) {
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

const countActive3d = function(inputWorld) {
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
