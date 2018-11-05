const solver = require("javascript-lp-solver")
const fs = require('fs')

const nutrients = require('./resources/nutrients')
const constraints = require('./resources/constraints')

const baseItem = nutrients.map(nutrient => ({[nutrient]: 0})).reduce((a,  b) => ({...a, ...b}))

const item = profile => ({
  'amount': 100,
  ...baseItem,
  ...profile
})

fs.readdir(`${__dirname}/resources/food`, (err, files) => {
  if (err) {
    throw new Error(err)
  }
  files.forEach(file => {
    console.log(file);
  });
})

// const model = {
//     "optimize": "calories",
//     "opType": "min",
//     constraints,
//     variables
// }


// results = solver.Solve(model)
//
// console.log(results)
