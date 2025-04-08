const mongoose = require('mongoose');

// Model for the schema of creating a new recipe for a dish
const DishSchema = new mongoose.Schema({
    name:{ type: String, require: true },
    ingredients:[String],
    preparationSteps: {type: String},
    cookingTime: {type: String },
    origin: {type: String},
    difficulty: String,
    createdAt: {type:Date,default:Date.now}
});

// // Creating the schema to be exported
const Dish = mongoose.model("Dish",DishSchema);

module.exports = Dish;