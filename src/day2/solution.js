const solve = async function(part) {
  const file = require(`../day2/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")
  var ranges = []
  var letters = []
  var passwords = []

  for (var i = 0; i < inputArray.length; i++) {
    var splitArray = inputArray[i].split(" ")
    ranges.push(splitArray[0]);
    letters.push(splitArray[1])
    passwords.push(splitArray[2])
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
  var correct = 0;
  ranges.forEach((range, i) => {
    const first = getMin(range) - 1
    const second = getMax(range) - 1

    var matching = 0
    if(passwords[i][first] == letters[i][0]) {
      matching++
    }
    if(passwords[i][second] == letters[i][0]) {
      matching++
    }
    if(matching == 1) {
      correct++
    }
  })
  return correct
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
