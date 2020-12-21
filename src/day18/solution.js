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
  return addLines(inputArray, false)
}

const solve2 = function(inputArray) {    
  return addLines(inputArray, true)
}

const addLines = function(inputArray, advanced) {
  let sum = 0
  inputArray.forEach((line) => {
    sum += parseLine(line, advanced)
  })
  return sum
}

const parseLine = function(line, advanced) {
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
    expression = parseExpression(expression, advanced)
    let sliceAt = lastParen - 1
    if(sliceAt < 0) {
      sliceAt = 0
    }
    line = spliceSlice(line, sliceAt, endLocation - lastParen + 2, expression)
  }
  return parseInt(line)
}

const parseExpression = function(expression, advanced) {
  expression = expression.split(" ")
  while(expression.length > 1) {
    let pluses = 0
    for(let j = 1; j < expression.length; j += 2) {
      if(expression[j] == '+') {
        pluses++
      }
    }
    let startPos = 0
    let performed = false
    while(!performed) {
      let left = expression[startPos]
      let sign = expression[startPos + 1]
      let right = expression[startPos + 2]
      if((pluses > 0) && (sign == '*') && (advanced == true)) {
        startPos += 2
      } else {
        let result = performOperation(left, sign, right)
        expression.splice(startPos, 3, result)
        performed = true
      }
    }
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
