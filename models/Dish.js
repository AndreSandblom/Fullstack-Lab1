const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name:{ type: String, require: true },
    ingredients:[String],
    preperationStep: {type: String},
    cookingTime: {type: String },
    origin: {type: String},
    difficulty: String,
    createdAt: {type:Date,default:Date.now}
});

const Dish = mongoose.model("Dish",DishSchema);

module.exports = Dish;