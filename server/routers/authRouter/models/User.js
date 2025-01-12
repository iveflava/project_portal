const { Schema, model } = require('mongoose');

const User = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    secondName: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    accounts: {
        instagram: {
            type: String,
        },
        telegram: {
            type: String,
        },
        mail: {
            type: String,
        },
    },
    role: {
        type: String,
    },
    aboutUser: {
        type: String,
    },
    birthday: {
        type: String,
    },
    hardwareAndSoftware: {
        type: String,
    },
    books: {
        type: String,
    },
    avatarSrc: {
        type: String,
    }
})

module.exports = model('User', User)