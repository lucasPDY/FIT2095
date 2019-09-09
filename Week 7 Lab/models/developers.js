const mongoose = require("mongoose");

let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            required: true,
            type: String
        },
        lastName: String
    },
    level: {
        type: String,
        required: true,
        validate: {
            validator: function(newLevel) {
                return newLevel === "BEGINNER" || newLevel === "EXPERT" ;
            }
        }
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String
    }
})


module.exports = mongoose.model('Developer', developerSchema);
