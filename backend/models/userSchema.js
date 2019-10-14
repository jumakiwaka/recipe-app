const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const user = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
});

mongoose.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', user);