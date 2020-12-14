const solve = async function(part) {
  const file = require(`../day13/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r")
  const earliest = parseInt(inputArray[0])
  const buses = inputArray[1]
    .split(',')
    .filter((bus) => bus != 'x')
    .map((bus) => parseInt(bus))
    .sort((a, b) => a - b)

  if(part == 1) {
      return solve1(earliest, buses)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(earliest, buses) {
  var found = 0
  var minutes = -1
  while(!found) {
    minutes++
    buses.forEach(bus => {
      if(((earliest + minutes) % bus) == 0) {
        found = bus
      }
    })
  }
  return (minutes * found)
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}



export default solve;
