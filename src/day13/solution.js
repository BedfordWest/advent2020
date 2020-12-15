const solve = async function(part) {
  const file = require(`../day13/INPUTS.json`)

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
  let earliest = parseInt(inputArray[0])
  let buses = inputArray[1]
    .split(',')
    .filter((bus) => bus != 'x')
    .map((bus) => parseInt(bus))
    .sort((a, b) => a - b)
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
  let buses = inputArray[1]
    .split(',')

  let originalBuses = buses
  .map((bus, index) => {
    if(bus == 'x') {
      return null
    } else {
      return [BigInt(parseInt(bus)), BigInt(index + 1)]
    }
  })
  .filter((bus) => bus != null)



  let found = 0n
  let lcm = originalBuses[0][0]
  let minutes = lcm - originalBuses[0][1]
  for(let i = 1; i < originalBuses.length; i++) {
    while(true) {
      minutes += lcm      
      if((minutes + originalBuses[i][1]) % originalBuses[i][0] != 0) {
        continue
      } else {
        lcm *= originalBuses[i][0]
        break
      }
    }
  }
  return minutes + 1n
}

export default solve;
