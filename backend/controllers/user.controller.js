const { normalize } = require("path");
const user = require("../models/users.js");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    try{
        const users = await user.find({});
        res.status(200).json(users);
      } catch{
        res.status(500).json({message: error.message});
      }
};

const getUsers = async (req, res) => {
    try{
        const { id } = req.params;
        const foundUser = await user.findById(id);
        res.status(200).json(foundUser);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
};

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase();

        const existingUser = await user.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            email: normalizedEmail,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Signup successful", email: normalizedEmail });
    } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase();

        const existingUser = await user.findOne({ email: normalizedEmail });
        if (!existingUser) {
            return res.status(403).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", email: normalizedEmail, success: true });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

module.exports = {
    getUser,
    getUsers,
    signUp,
    signIn,
};