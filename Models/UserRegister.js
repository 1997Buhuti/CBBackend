
const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
      question : String,
      name: String,
      email: String,
      date: String
});

module.exports = mongoose.model('registration', registrationSchema);
