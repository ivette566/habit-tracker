
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

// Modelo Habit 
module.exports = mongoose.model('Habit', HabitSchema);
