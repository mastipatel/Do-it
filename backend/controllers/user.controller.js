const user = require("../models/users.js");

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

const createUser = async (req,res) => {
    try{
        const createdUser = await user.create(req.body);
        res.status(200).json(createdUser);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
};

module.exports = {
    getUser,
    getUsers,
    createUser,
};

