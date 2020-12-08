const solve = async function(part) {
  const file = require(`../day3/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")

  if(part == 1) {
      return solve1(inputArray, 3, 1)
  }
  else {
      var slope1 = solve1(inputArray, 1, 1)
      var slope2 = solve1(inputArray, 3, 1)
      var slope3 = solve1(inputArray, 5, 1)
      var slope4 = solve1(inputArray, 7, 1)
      var slope5 = solve1(inputArray, 1, 2)
      return slope1 * slope2 * slope3 * slope4 * slope5
  }
}

const solve1 = function(inputArray, right, down) {
  var times = tilesRequired(inputArray, right, down)
  inputArray = copyMap(inputArray, times)
  return countTrees(inputArray, right, down)
}

// Determine how many copies of the input map need to be made to ski down
const tilesRequired = function(inputArray, right, down) {
  const widthRequired = right * Math.ceil((inputArray.length - 1)/down)
  return Math.ceil(widthRequired/inputArray[0].length)
}

const copyMap = function(inputArray, times) {
  inputArray = inputArray.map(inner => {
    var copy = JSON.parse(JSON.stringify(inner));
    for(var i = 0; i < times; i++) {
      inner = inner.concat(copy)
    }    
    return inner
  })
  return inputArray  
}

const countTrees = function(inputArray, right, down) {
  var x = right
  var y = down
  var trees = 0
  while(y < inputArray.length) {
    if(inputArray[y][x] == '#') {
      trees++
    }
    x += right
    y += down
  }
  return trees
}

export default solve;
