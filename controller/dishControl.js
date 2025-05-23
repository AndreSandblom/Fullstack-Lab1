const Dish = require("../models/Dish");


// Logic for routing all the dishes 
const getAll = async (req,res) => {
    try{
        // Return all the dishes
        const dishes = await Dish.find();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({message: "Server Error",error});
    }
};


const getDishId = async (req,res) => {
    try {
        const { id } = req.params;
        const dish = await Dish.findById(id);

        if (!dish) {
            res.status(404).json({message: "Dish not found"});
        }
        
        res.status(200).json(dish);

    } catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong", error});
    }
}
// Logic for routing getting a dish by name
const getDishName = async (req,res) => {
    try {
        const { name } = req.params;
        // Finding a dish by name
        const dish = await Dish.findOne({name});

        if (!dish) {
            return res.status(404).json({message: "Dish not found"});
        };

        res.status(200).json(dish);

    } catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong.", error});
    }
};

// Logic for routing adding a new dish
const addDish = async (req,res) => {
    try{
        const newDish = req.body;
        
        // Check so dish doesnt already exists 
        const checkDish = await Dish.findOne({ name:newDish.name });
        if (checkDish) {
            return res.status(409).json({message: "Dish already exist"});
        }

        // If not existing create the dish
        const dish = new Dish(newDish);
        await dish.save();

        res.status(201).json(dish);

    } catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong", error});
    }
};

// Logic for routing the updating of a dish 
const updateDish = async (req,res) => {
    try{
        const { id } = req.params;
        const updatedDish = req.body;

        // Updating the dish by id
        const dish = await Dish.findByIdAndUpdate(id, updatedDish)

        if (!dish) {
            res.status(404).json({message: "Dish not found"});
        }

        res.status(200).json(dish);

    } catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong", error});
    }
};

// Logic for routing the deletion of a dish 
const deleteDish = async (req,res) => {
    try{
        const { id } = req.params;

        // Deleting the dish by id
        const dish = await Dish.findByIdAndDelete(id);

        if (!dish) {
            res.status(404).json({message: "Did not find dish"})
        }

        res.status(200).json({message: "Dish succesfully deleted"});

    } catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong", error});
    }
};

// Collection all the exports
module.exports = {
    getAll,
    getDishId,
    getDishName,
    addDish,
    updateDish,
    deleteDish
};