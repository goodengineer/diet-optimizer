const solver = require("javascript-lp-solver")
const fs = require('fs')

const nutrients = require('./resources/nutrients')
const constraints = require('./resources/constraints')

const baseItem = nutrients.map(nutrient => ({[nutrient]: 0})).reduce((a,  b) => ({...a, ...b}))

const item = (name, profile) => ({
  [name]: 1.0,
  'amount': 100,
  ...baseItem,
  ...profile
})

const getFood = () => new Promise(function(resolve, reject) {
  fs.readdir(`${__dirname}/resources/food`, (err, files) => {
    if (err) {
      return reject(err)
    }
    let food = {}
    files.forEach(fileName => {
      const foodName = fileName.split('.')[0]
      food[foodName] = item(foodName, require(`${__dirname}/resources/food/${fileName}`))
    });
    resolve(food)
  })
})

getFood()
.then(food => {
  const model = {
      "optimize": "calories",
      "opType": "min",
      constraints,
      variables: food
  }

  const results = solver.Solve(model)
  console.log(results)
})
