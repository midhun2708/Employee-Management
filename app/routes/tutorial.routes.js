const tutorials = require("../controllers/tutorial.controller.js");
const express = require("express")

var router = express.Router();

// Create a new Tutorial example
router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);


// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", tutorials.findOne);

// Update a Tutorial with id
router.put("/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Create a new Tutorial
router.delete("/", tutorials.deleteAll);

module.exports=router

