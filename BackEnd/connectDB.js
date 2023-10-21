const mongoose = require('mongoose');
require("dotenv").config()

const connectToDb = () => {
    // mongoose.connect this function is required to connect to the database

    mongoose.connect(`${process.env.DBConnect}/note_book`, () => {
        console.log("Database connection established")
    }, { useNewUrlParser: true })

}

mongoose.set('strictQuery', false);




module.exports = connectToDb