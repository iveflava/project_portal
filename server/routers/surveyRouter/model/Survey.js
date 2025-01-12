const { Schema, model } = require('mongoose');

const SurveySchema = new Schema({
    heading: {
        type: String,
        required: true,
    },
    answers: [
        {
            text: {
                type: String,
                required: true
            },
            votes: [String],
        },
    ],
});

module.exports = model('Survey', SurveySchema);
