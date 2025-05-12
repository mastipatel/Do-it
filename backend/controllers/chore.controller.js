const chore = require("../models/chores.js");

const getChores = async (req, res) => {
        try{
            const chores = await chore.find({});
            res.status(200).json(chores);
          } catch (error) {
            res.status(500).json({message: error.message});
          }
};

const getChore = async (req, res) => {
    try{
        const { id } = req.params;
        const foundChore = await chore.findById(id);
        res.status(200).json(foundChore);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
};

const getChoreByEmail = async (req, res) => {
    try{
        const { email } = req.params;
        const foundChore = await chore.find({assignee: email});
        res.status(200).json(foundChore);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
};


const createChore = async (req,res) => {
    try{
        const createdChore = await chore.create(req.body);
        res.status(200).json(createdChore);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
};

const updateChore = async (req, res) => {
    try{
        const { id } = req.params;
        const findchore = await chore.findByIdAndUpdate(id, req.body);
   
        if(!findchore) {
         return res.status(404).json({message: "Chore not found"});
        }
   
        const updatedChore = await chore.findById(id);
        res.status(200).json(updatedChore);
   
     } catch (error) {
       res.status(500).json({message: error.message});
     }
};

const deleteChore = async (req, res) => {
    try{
        const {id} = req.params;
        const choreToDelete = await chore.findByIdAndDelete(id);
    
        if(!choreToDelete) {
          return res.status(404).json({message: "Chore not found"});
         }
         res.status(200).json({message: "Chore deleted succesfully"});
      } catch (error) {
        res.status(500).json({message: error.message});
      }
};

module.exports = {
    getChores,
    getChore,
    createChore,
    updateChore,
    deleteChore,
    getChoreByEmail
};

