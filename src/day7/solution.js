var bags = {}

const solve = async function(part) {
  const file = require(`../day7/INPUTS.json`)

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
  inputArray.forEach(bagRule => {
    parseBagRule(bagRule)    
  })
  return searchBagsForGold()
}

const solve2 = function(inputArray) {    
  console.log(inputArray)
}

const parseBagRule = function(bagRule) {  
  const splitRule = bagRule.split(" bags contain ")
  var sanitizedContains = splitRule[1].replace(/\s+bag+s*/g, '').replace('.','').split(',')
  sanitizedContains = sanitizedContains.map(innerBags => {
    if(innerBags.includes("no other")) {
      return "no other"
    } else {
      let re = /(\d+)(\D+)/
      const matches = re.exec(innerBags)
      var entry = {}
      entry[matches[2].slice(1)] = parseInt(matches[1])
      return entry
    }
  })
  bags[splitRule[0]] = sanitizedContains
}

const searchBagsForGold = function() {
  var count = 0
  for (var bag in bags) {
    if(bag == "shiny gold") { 
      continue; 
    }
    if(bag.includes("no other")) { continue; }
    else {
      if( bags[bag].some((innerBag) => {
        if (goldInBag(innerBag)) { 
          return true
        }
      })) { count++ }
    }
  }
  return count
}

const goldInBag = function(bag) {
  const bagName = Object.keys(bag)[0]
  if(bagName == 0) {
    return false;
  }
  if(bagName == "shiny gold") { 
    return true
  }
  return bags[bagName].some(innerBag => {    
    var found = goldInBag(innerBag)
    if(found) {
      return true
    }
  })
}



/*const getContainingBags = function(bagRule) {

}*/

export default solve;
