const solve = async function(part) {
  const file = require(`../day18/INPUTS.json`)

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
  let sum = 0
  inputArray.forEach((line) => {
    sum += parseLine(line)
  })
  return sum
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const parseLine = function(line) {
  let finished = false

  while(!finished) {
    // Find the opening paren
    let lastParen = line.lastIndexOf("(") + 1
    if(lastParen == 0) {
      finished = true
    }

    // Find the closing paren that matches the opening one
    let endLocation = line.indexOf(")", lastParen)
    if(endLocation == -1) {
      endLocation = line.length
    }

    // Evaluate the expression and swap the result into the original spot
    let expression = line.slice(lastParen, endLocation)
    expression = parseExpression(expression)
    let sliceAt = lastParen - 1
    if(sliceAt < 0) {
      sliceAt = 0
    }
    line = spliceSlice(line, sliceAt, endLocation - lastParen + 2, expression)
  }
  return parseInt(line)
}

const parseExpression = function(expression) {
  expression = expression.split(" ")
  while(expression.length > 1) {
    let left = expression[0]
    let sign = expression[1]
    let right = expression[2]
    let result = performOperation(left, sign, right)
    for(let i = 0; i < 3; i++) {
      expression.shift()
    }
    expression.unshift(result)
  }
  return expression[0]
}

const performOperation = function(left, sign, right) {
  left = parseInt(left)
  right = parseInt(right)

  if(sign == "+") {
    return left + right
  } else if (sign == "*") {
    return left * right
  }
}

function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

export default solve;
