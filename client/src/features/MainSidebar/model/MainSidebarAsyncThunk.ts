import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTokenRefreshAsyncThunk } from '@/app/model/GlobalAsyncThunk';
import { getTokens } from '@/shared/lib/helpers';
import { fetchGetSurveys, fetchSetVote } from '../api/MainSidebar';

export const fetchGetSurveysAsyncThunk = createAsyncThunk(
  'Main/fetchGetSurveysAsyncThunk',
  async ({ redirect }: {redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const response = await fetchGetSurveys(accessToken);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchGetSurveysAsyncThunk,
          asyncThunkArgs: {
            redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);

export const fetchSetVoteAsyncThunk = createAsyncThunk(
  'Main/fetchSetVoteAsyncThunk',
  async ({ surveyId, answerText, redirect }: {surveyId: string, answerText: string, redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      await fetchSetVote(surveyId, answerText, accessToken);
      return surveyId;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchSetVoteAsyncThunk,
          asyncThunkArgs: {
            redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);
