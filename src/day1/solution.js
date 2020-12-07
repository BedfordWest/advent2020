const solve = async function(part) {
    const file = require(`../day1/INPUTS.json`)

    const inputs = file.inputs
    var inputArray = inputs.split(" ").map(entry => entry = parseInt(entry))

    if(part == 1) {
        return solve1(inputArray)
    }
    else {
        return solve2(inputArray)
    }
}

const solve1 = function(inputArray) {
    var tracker1 = 0
    for(var value1 of inputArray) {
        var tracker2 = 0
        for(var value2 of inputArray) {    
            if(tracker1 == tracker2) {
                tracker2++
                continue;
            }
            if (value1 + value2 == 2020) {
                return value1 * value2;
            }
            tracker2++
        }
        tracker1++
    }
}

const solve2 = function(inputArray) {    
    var tracker1 = 0
    for(var value1 of inputArray) {
        var tracker2 = 0
        for(var value2 of inputArray) {
            if(tracker1 == tracker2) {
                tracker2++
                continue;
            }
            if(value1 + value2 >= 2020) {
                tracker2++
                continue;
            }
            var tracker3 = 0
            for(var value3 of inputArray) {
                if((tracker1 == tracker3) || (tracker2 == tracker3)) {
                    tracker3++
                    continue;
                }
                if(value1 + value2 + value3 == 2020) {
                    console.log(`${value1}, ${value2}, ${value3}`)
                    return value1 * value2 * value3
                }
                tracker3++
            }
            tracker2++
        }
        tracker1++
    }
}

export default solve;
