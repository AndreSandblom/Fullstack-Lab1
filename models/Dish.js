const moongoose = require('mongoose');

const DishScehma = new moongoose.Schema({
    name:{ type: String, require: true },
    ingredients:[String],
    preperationsStep: {type: String},
    cookingTime: {type: String },
    origin: {type: String},
    difficulty: String,
    createdAt: {type:Date,default:Date.now}
});

const Dish = moongoose.model("Dish",DishScehma);

module.exports = Dish;