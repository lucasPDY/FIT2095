let mongoose = require('mongoose');

let authorSchema = mongoose.Schema({
    name: String,
    pages: Number,
    authors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Author
    }
})

let authorModel = mongoose.model("Author", authorSchema)