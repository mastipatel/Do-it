const express = require("express");
const User = require("../models/users.js")
const router = express.Router();
const {getUser, getUsers, signIn, signUp} = require('../controllers/user.controller.js');
const {loginValidation, signupValidation} = require('../middleware/AuthValidation.js');

router.get('/', getUsers);
router.get('/:id', getUser);

router.post('/sign-in', loginValidation, signIn);
router.post('/sign-up', signupValidation, signUp);

module.exports = router;