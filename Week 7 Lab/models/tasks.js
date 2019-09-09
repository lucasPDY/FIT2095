const mongoose = require("mongoose");

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        validate: {
            validator: function (newStatus){
                return newStatus === "Completed" 
                || newStatus === "InProgress"
            },
            message: "Status should be either Completed or InProgress"
        }
    },
    description: String
})


module.exports = mongoose.model('Task', taskSchema);
