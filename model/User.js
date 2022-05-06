// Importing Mongoose to create Schema for mongodb
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fname: {
        type:String,
        required: true,
        min: 6,
        max: 255 // Database Validations
    },
    lname: {
        type:String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type:String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type:String,
        required: true,
        min: 8,
        max: 50
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("User", userSchema)