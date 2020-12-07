const solve = async function() {
    const file = require(`../day1/INPUTS.json`)

    const inputs = file.inputs
    const inputArray = inputs.split(" ").map(entry => entry = parseInt(entry))

    return inputArray.reduce((a, b) => a + b)
}

export default solve;
