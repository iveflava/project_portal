const { Schema, model } = require('mongoose');

const News = new Schema({
    heading: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }
})

module.exports = model('News', News)