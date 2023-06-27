const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    tasks: [String],
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date
    }
})
todoSchema.index({ '$**': 'text' })

module.exports = mongoose.model("Todo", todoSchema);