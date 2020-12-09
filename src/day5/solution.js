const solve = async function(part) {
  const file = require(`../day5/INPUTS.json`)

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
  inputArray = inputArray.map(input => {
    return getSeatId(input)
  })
  inputArray.sort(function(a, b){ return b - a });
  return inputArray[0]
}

const solve2 = function(inputArray) {   
  inputArray = inputArray.map(input => {
    return getSeatId(input)
  })
  inputArray.sort(function(a, b){ return b - a });
  console.log(inputArray)
  for(var i = 8; i < inputArray.length - 7; i++) {
    if((inputArray[i - 1] - inputArray[i]) > 1) { return inputArray[i] + 1 }
  }
}

const getSeatId = function(seat) {
  seat = seat.split('')
  var row = 0
  var column = 0
  var min = 0
  var max = 127
  for(var i = 0; i < 7; i++) {
    if(seat[i] == 'B') {
      min += Math.ceil((max - min)/2)
    }
    else {
      max -= Math.ceil((max - min)/2)
    }
  }
  row = min
  min = 0
  max = 7
  for(var j = 7; j < 10; j++) {
    if(seat[j] == 'R') {
      min += Math.ceil((max - min)/2)
    }
    else {
      max -= Math.ceil((max - min)/2)
    }
  }
  column = min
  return ((row * 8) + column)
}

export default solve;
