const mongoose = require('mongoose');
const { Schema } = mongoose


// Creating a new Schema object with the required fields 
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    Date: {
        type: Date,
        default: Date.now
    }

});

// Exporting a Schema object and creacting a model instance from the schema object .
// mongoose.model(name of the database collection , name of schema object )

module.exports = mongoose.model('notes', NotesSchema);