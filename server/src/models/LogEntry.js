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
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    required: true,
    type: Date,
  },
  image: String
}, {
  timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', LogEntrySchema)

module.exports = LogEntry;