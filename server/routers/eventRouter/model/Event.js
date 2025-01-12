const { Schema, model } = require('mongoose');

const Event = new Schema({
    heading: {
        type: String,
        require: true,
    },
    mode: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
})

module.exports = model('Event', Event)