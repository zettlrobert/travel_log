const mongoose = require('mongoose');

const { Schema } = mongoose;


// Reusable Settings
const requiredNumber = {
  type: Number,
  required: true,
}


const LogEntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  personalComment: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  latitude: requiredNumber,
  longitude: requiredNumber,
  visitDate: {
    required: true,
    type: Date,
  }
}, {
  timestamps: true
});