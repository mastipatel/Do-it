const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter your email"]
        },

        password: {
            type: String,
            required: [true, "Please enter your password"]
        }   
    }
)

const user = mongoose.model("user", usersSchema);

module.exports = user;
