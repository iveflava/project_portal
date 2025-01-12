import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTokens } from '@/shared/lib/helpers';
import { fetchTokenRefreshAsyncThunk } from '@/app/model/GlobalAsyncThunk';
import { fetchGetTeams, fetchJoinTeam } from '../api/TeamsApi';

export const fetchGetTeamsAsyncThunk = createAsyncThunk(
  'Teams/fetchGetTeams',
  async ({ redirect }: {redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const response = await fetchGetTeams(accessToken);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchGetTeamsAsyncThunk,
          asyncThunkArgs: {
            redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);

export const fetchJoinTeamAsyncThunk = createAsyncThunk(
  'Teams/fetchJoinTeam',
  async ({ id, redirect }: {id: string, redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const response = await fetchJoinTeam(accessToken, id);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchJoinTeamAsyncThunk,
          asyncThunkArgs: {
            id, redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);
