const { Schema, model, Types } = require('mongoose');

const Team = new Schema({
    name: { type: String, required: true },
    members: [{ type: Types.ObjectId, ref: 'User' }]
});

module.exports = model('Team', Team)