import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeSurvey } from '../types';
import { fetchGetSurveysAsyncThunk, fetchSetVoteAsyncThunk } from './MainSidebarAsyncThunk';

type TypeMainSidebarState = {
    surveys: TypeSurvey[],
};

const initialState: TypeMainSidebarState = {
  surveys: [],
};

const MainSidebarSlice = createSlice({
  name: 'MainSidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchGetSurveysAsyncThunk.fulfilled, (state, action: PayloadAction<TypeSurvey[]>) => ({
      ...state,
      surveys: action.payload,
    }))
    .addCase(fetchSetVoteAsyncThunk.fulfilled, (state, action: PayloadAction<string>) => ({
      ...state,
      surveys: state.surveys.map((survey) => ({
        ...survey,
        userVoted: survey._id === action.payload ? true : survey.userVoted,
      })),
    })),
});

export default MainSidebarSlice.reducer;

// export const {} = MainSidebarSlice.actions;
