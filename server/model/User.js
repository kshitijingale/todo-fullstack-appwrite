const mongoose = require('mongoose')
const Todo = require('./Todo').schema

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true
    },
    token: {
        type: String
    },
    appwriteId: {
        type: String,
        required: [true, "Appwrite ID is required"]
    },
    todos: [Todo]
})

module.exports = mongoose.model('user', userSchema);