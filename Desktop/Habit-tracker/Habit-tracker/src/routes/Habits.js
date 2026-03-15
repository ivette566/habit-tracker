const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// GET: obtener todos los hábitos
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: crear un nuevo hábito
router.post('/', async (req, res) => {
  const habit = new Habit({
    name: req.body.name,
    description: req.body.description,
    userId: req.body.userId
  });

  try {
    const newHabit = await habit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: actualizar un hábito por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: eliminar un hábito por ID
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hábito eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
