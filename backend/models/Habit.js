const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  frequency: { type: String, default: 'daily' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);
