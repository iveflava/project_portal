import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetEvents, fetchGetNews } from '../api/MainApi';
import { getTokens } from '@/shared/lib/helpers';
import { fetchTokenRefreshAsyncThunk } from '@/app/model/GlobalAsyncThunk';

export const fetchGetNewsAsyncThunkk = createAsyncThunk(
  'Main/fetchGetNewsAsyncThunkk',
  async ({ redirect }: {redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const response = await fetchGetNews(accessToken);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchGetNewsAsyncThunkk,
          asyncThunkArgs: {
            redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);

export const fetchGetEventsAsyncThunk = createAsyncThunk(
  'Main/fetchGetEventsAsyncThunk',
  async ({ redirect }: {redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const response = await fetchGetEvents(accessToken);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchGetEventsAsyncThunk,
          asyncThunkArgs: {
            redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);
