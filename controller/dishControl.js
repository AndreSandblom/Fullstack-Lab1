const Dish = require("../models/Dish");

const getAll = async (req,res) => {
    console.log("🔍 Incoming GET request to /api/dishes");
    try{
        const dishes = await Dish.find();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({message: "Server Error",error});
    }
};

module.exports = {
    getAll
};