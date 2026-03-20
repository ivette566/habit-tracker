import { useEffect, useState } from 'react';

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // Cargar hábitos desde el backend
  useEffect(() => {
    fetch('http://localhost:4000/habits')
      .then(res => res.json())
      .then(data => setHabits(data));
  }, []);

  // Crear hábito
  const addHabit = async () => {
    if (!newHabit.trim()) return;
    await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newHabit })
    });
    setNewHabit('');
    const updated = await fetch('http://localhost:4000/habits').then(res => res.json());
    setHabits(updated);
  };

  // Eliminar hábito
  const deleteHabit = async (id) => {
    await fetch(`http://localhost:4000/habits/${id}`, { method: 'DELETE' });
    setHabits(habits.filter(habit => habit._id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mis Hábitos</h1>

      <input
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="Nuevo hábito"
      />
      <button onClick={addHabit}>Agregar</button>

      <ul>
        {habits.map(habit => (
          <li key={habit._id}>
            {habit.name}
            <button onClick={() => deleteHabit(habit._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
