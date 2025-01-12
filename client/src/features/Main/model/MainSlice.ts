import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeEvent, TypeNews } from '../types';
import { fetchGetEventsAsyncThunk, fetchGetNewsAsyncThunkk } from './MainAsyncThunk';

type TypeMainState = {
    news: TypeNews[],
    pendingNews: boolean,
    events: TypeEvent[],
    pendingEvents: boolean,
};

const initialState: TypeMainState = {
  news: [],
  pendingNews: true,
  events: [],
  pendingEvents: true,
};

const Main = createSlice({
  name: 'Main',
  initialState,
  reducers: {
    setPendingNews: (state, action: PayloadAction<boolean>) => ({
      ...state,
      pendingNews: action.payload,
    }),
    setPendingEvents: (state, action: PayloadAction<boolean>) => ({
      ...state,
      pendingEvents: action.payload,
    }),
  },
  extraReducers: (builder) => builder
    .addCase(fetchGetNewsAsyncThunkk.fulfilled, (state, action: PayloadAction<TypeNews[]>) => ({
      ...state,
      news: action.payload,
      pendingNews: false,
    }))
    .addCase(fetchGetEventsAsyncThunk.fulfilled, (state, action: PayloadAction<TypeEvent[]>) => ({
      ...state,
      events: action.payload,
      pendingEvents: false,
    })),
});

export default Main.reducer;

export const { setPendingNews, setPendingEvents } = Main.actions;
