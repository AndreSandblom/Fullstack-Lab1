const express = require("express");
const router = express.Router();
const dishController = require("../controller/dishControl");


router.get("/", dishController.getAll);
/* Crud routes go here like:
router.get("/:name, dishController.NAME OF THE OPERATION")
router.post("/ dishController.NAME OF THE OPERATION")
router.put("/:id, dishController.NAME OF THE OPERATION")
router.delete("/:id, dishController.NAME OF THE OPERATION")
*/

module.exports = router;