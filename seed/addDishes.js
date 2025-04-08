// File used to populate the database, logic also clears databae before applying new recipe to avoid duplicates
// Call node /seed/adddDishes.js
require("dotenv").config();
const mongoose = require("mongoose");
const Dish = require("../models/Dish.js");

// Creating five different recipes to pipulate the database with
const addDishes = [
    {
        name: "Fish n Chips",
        ingredients: ["White fish", "Panko", "Potatoes", "Remoulade sauce"],
        preparationSteps: "Coat the white fish with pank and fry. Slice potatoes into staves and oven cook for chips. Serve with remoulade.",
        cookingTime:"25 minutes",
        origin:"England",
        difficulty:"Medium"
    },
    {
        name: "Swedish Meatballs with Mashed Potatoes",
        ingredients: ["Minced Meat", "Potatoes", "Lingon", "Milk"],
        preparationSteps: "Roll the minced meat into balls and cook on medium heat. Boil potatoes and mash together with heated milk. Serve with Lingon",
        cookingTime:"30 minutes",
        origin:"Sweden",
        difficulty:"Hard"
    },
    {
        name: "Pancakes",
        ingredients: ["Milk", "Flour", "Egg", "Salt"],
        preparationSteps: "Mix Egg and Milk, add Flour and salt. Cook on medium heat",
        cookingTime:"20 minutes",
        origin:"Ancient Greece",
        difficulty:"Medium"
    },
    {
        name: "Pasta Pesto",
        ingredients: ["Pasta", "Pesto", "Permasan"],
        preparationSteps: "Cook Pasta, Mix in Pesto and top with shredded Permesan",
        cookingTime:"15 minutes",
        origin:"Italy",
        difficulty:"Easy"
    },
    {
        name: "Ham Sandwich",
        ingredients: ["Toast","Cheese","Ham"],
        preparationSteps: "Start Sandwich grill, Put Ham and Cheese on toast, top with another toast and grill for 4 minutes.",
        cookingTime:"10 minutes",
        origin:"Cuba",
        difficulty:"Very easy"
    }
];  

// Function to be called to actually create the recipse and adding them to the database
const seedDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        await Dish.deleteMany();
        await Dish.insertMany(addDishes);
        console.log("Dished added successfully.");
        mongoose.disconnect();
    } catch(error){
        console.log("Could not add the dishes to DB", error);
    }
};

// Calling the function inside of the file to be able to use it from terminal
seedDB();