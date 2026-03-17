import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../habitsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector(state => state.habits);

  useEffect(() => {
    fetch('http://localhost:4000/habits')
      .then(res => res.json())
      .then(data => dispatch(setHabits(data)));
  }, [dispatch]);

  return (
    <div>
      <h1>Mis Hábitos</h1>
      <ul>
        {habits.map((h, i) => (
          <li key={i}>{h.name} - {h.days} días</li>
        ))}
      </ul>
    </div>
  );
}
