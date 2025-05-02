const mongoose = require('mongoose');

const choresSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['kitchen', 'bathroom', 'backyard'],
        },
        assignee: {
            type: String,
            required: true
        },
        Deadline: {
            type: Date,
            required: true
        },
        Reminder: {
            type: Boolean,
            required: true
        },
        status: {
            type: String,
            enum: ['To-do', 'In-progress', 'Done'],
            default: 'To-do'
        },
    }
)

const chore = mongoose.model("Chore", choresSchema);

module.exports = chore;

