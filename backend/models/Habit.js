const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: Number, default: 0 },
  completedDates: [{ type: Date }]
});

module.exports = mongoose.model('Habit', habitSchema);
