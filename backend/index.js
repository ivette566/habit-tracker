const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Habit = require('./models/Habit');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas con usuario HabitUser y contraseña Bruno2606.
mongoose.connect(
  'mongodb+srv://HabitUser:Bruno2606.@cluster0.xh09oue.mongodb.net/habitdb?retryWrites=true&w=majority'
)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error de conexión:', err));

// Obtener todos los hábitos
app.get('/habits', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo hábito
app.post('/habits', async (req, res) => {
  try {
    const newHabit = new Habit({ name: req.body.name });
    await newHabit.save();
    res.json(newHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar un hábito por ID
app.put('/habits/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un hábito por ID
app.delete('/habits/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hábito eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(4000, () => console.log('Servidor backend en http://localhost:4000'));

