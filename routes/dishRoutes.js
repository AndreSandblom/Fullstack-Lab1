const express = require("express");
const router = express.Router();
const dishController = require("../controller/dishControl");

// Logic for different routes currently being used (controlled by controller file)
router.get("/", dishController.getAll);
router.get("/:name", dishController.getDishName);
router.post("/", dishController.addDish);
router.put("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);

module.exports = router;