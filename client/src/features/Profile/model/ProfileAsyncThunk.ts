import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTokenRefreshAsyncThunk } from '@/app/model/GlobalAsyncThunk';
import { getTokens } from '@/shared/lib/helpers';
import { fetchGetFullProfile } from '../api/ProfileApi';

export const fetchGetFullProfileAsyncThunk = createAsyncThunk(
  'Profile/fetchGetFullProfile',
  async ({ id, redirect }: { id: string, redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const response = await fetchGetFullProfile(accessToken, id);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchGetFullProfileAsyncThunk,
          asyncThunkArgs: {
            id, redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);
