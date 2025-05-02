const express = require("express");
const User = require("../models/users.js")
const router = express.Router();
const {getUser, getUsers,createUser} = require('../controllers/user.controller.js');

router.get('/', getUser);
router.get('/:id', getUsers);

router.post('/', createUser);

module.exports = router;