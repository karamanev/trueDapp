const fs = require ('fs')
const solc = require ('solc')

//compile the contract

let contractFile = fs.readFileSync('./News_string.sol').toString ('utf-8')
let output = solc.compile(contractFile)

console.log(output)
