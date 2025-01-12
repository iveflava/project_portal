import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeTeam } from '../types';
import { fetchGetTeamsAsyncThunk, fetchJoinTeamAsyncThunk } from './TeamsAsyncThunk';

type TypeTeamsState = {
    teams: TypeTeam[],
}

const initialState: TypeTeamsState = {
  teams: [],
};

const TeamsSlice = createSlice({
  name: 'Teams',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => builder
    .addCase(fetchGetTeamsAsyncThunk.fulfilled, (state, action: PayloadAction<TypeTeam[]>) => ({
      ...state,
      teams: action.payload,
    }))
    .addCase(fetchJoinTeamAsyncThunk.fulfilled, (state, action: PayloadAction<TypeTeam>) => ({
      ...state,
      teams: state.teams.map((team) => (team._id === action.payload._id
        ? action.payload
        : ({
          _id: team._id,
          name: team.name,
          members: team.members.map((member) => ({
            _id: member._id,
            firstName: member.firstName,
            secondName: member.secondName,
            avatarSrc: member.avatarSrc,
            country: member.country,
            city: member.city,
            role: member.role,
          })),
        }))),
    })),
});

export default TeamsSlice.reducer;

// export const {} = TeamsSlice.actions;
