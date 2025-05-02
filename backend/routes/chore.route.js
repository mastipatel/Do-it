const express = require("express");
const Chore = require("../models/chores.js");
const router = express.Router();
const {getChores, getChore, createChore, updateChore, deleteChore} = require('../controllers/chore.controller.js');

router.get('/', getChores);
router.get('/:id', getChore);

router.post('/', createChore);

//update a chore
router.put('/:id', updateChore);

//delete a chore
router.delete('/:id', deleteChore);

module.exports = router;