const express = require("express");
const Chore = require("../models/chores.js");
const router = express.Router();
const {getChores, getChore, createChore, updateChore, deleteChore, getChoreByEmail} = require('../controllers/chore.controller.js');

router.post('/add-chore', createChore);

//get all chores
router.get('/', getChores);
router.get('/:id', getChore);
router.get('/by-email/:email', getChoreByEmail);

//update a chore
router.put('/:id', updateChore);

//delete a chore
router.delete('/:id', deleteChore);

module.exports = router;