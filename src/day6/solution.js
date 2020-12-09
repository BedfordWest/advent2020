const solve = async function(part) {
  const file = require(`../day6/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r\n\r")

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  return inputArray.reduce((acc, curr) => {    
    return (acc + getGroupCount(curr))
  }, 0)
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const getGroupCount = function(group) {
  var set = new Set()
  var people = group.split("\n\r")
  for(var person of people) {
    const answers = person.split('')
    for(var answer of answers) {
      set.add(answer)
    }
  }
  return set.size
}

export default solve;
