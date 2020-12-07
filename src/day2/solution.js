const solve = async function(part) {
  const file = require(`../day2/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split(" ")
  var ranges = []
  var letters = []
  var passwords = []

  for (var i = 0; i < inputArray.length; i=i+3) {
    ranges.push(inputArray[i]);
  }

  for (var i = 1; i < inputArray.length; i=i+3) {
    letters.push(inputArray[i]);
  }

  for (var i = 2; i < inputArray.length; i=i+3) {
    passwords.push(inputArray[i]);
  }

  if(part == 1) {
      return solve1(ranges, letters, passwords)
  }
  else {
      return solve2(ranges, letters, passwords)
  }
}

const solve1 = function(ranges, letters, passwords) {
  var correct = 0;
  ranges.forEach((range, i) => {
    const min = getMin(range)
    const max = getMax(range)
    const count = letterCount(letters[i][0], passwords[i])
    if ((min <= count) && (count <= max)) {
      correct++
    }
  })
  return correct
}

const solve2 = function(ranges, letters, passwords) {    
  console.log(ranges)
  console.log(letters)
  console.log(passwords)
}

const getMin = function(range) {
  return parseInt(range.split("-")[0])
}

const getMax = function(range) {
  return parseInt(range.split("-")[1])
}

const letterCount = function(letter, password) {
  return (password.split(letter).length - 1)
}

export default solve;
