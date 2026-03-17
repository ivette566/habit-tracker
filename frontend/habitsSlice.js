import { createSlice } from '@reduxjs/toolkit';

const habitsSlice = createSlice({
  name: 'habits',
  initialState: [],
  reducers: {
    setHabits: (state, action) => action.payload,
  },
});

export const { setHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
