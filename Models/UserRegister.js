const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    name: String,
    email: String,
});

module.exports = mongoose.model('registration', registrationSchema);
