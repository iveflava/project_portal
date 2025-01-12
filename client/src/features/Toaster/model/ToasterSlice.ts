import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TypeToast = {
  id: number,
  message: string
  type: 'red' | 'green' | 'yellow' | 'loading',
}

const initialState: TypeToast[] = [];

const ToasterSlice = createSlice({
  name: 'Toaster',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<{message: string, type: 'red' | 'green' | 'yellow' | 'loading', id?: number}>) => (
      [...state, { id: state[state.length - 1] ? state[state.length - 1].id + 1 : 0, ...action.payload }]
    ),
    removeToast: (state, action: PayloadAction<number>) => state.filter((el) => el.id !== action.payload),
  },
});

export default ToasterSlice.reducer;

export const { addToast, removeToast } = ToasterSlice.actions;
