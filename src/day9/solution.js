const solve = async function(part) {
  const file = require(`../day9/INPUTS.json`)

  const inputs = file.inputs
  var inputArray = inputs.split("\n\r").map((el) => parseInt(el))

  if(part == 1) {
      return solve1(inputArray)
  }
  else {
      return solve2(inputArray)
  }
}

const solve1 = function(inputArray) {
  for(let i = 25; i < inputArray.length; i++) {
    let slice = inputArray.slice(i - 25, i)
    if(!checkInput(slice, inputArray[i])) {
      return inputArray[i]
    }
  }
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const checkInput = function(slice, current) {
  return slice.some((el) => {
    let copy = [...slice]
    copy.splice(copy.indexOf(el), 1)
    return copy.some((innerEl) => {
      return (innerEl + el == current)
    })
  })
}

export default solve;
