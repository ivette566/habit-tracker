// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const habitsRouter = require('./src/routes/Habits');

const app = express();   // 👈 primero inicializamos app
const PORT = process.env.PORT || 4000;

// Middleware para interpretar JSON
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/habits', habitsRouter);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

