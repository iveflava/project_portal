import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileAsyncThunk } from './GlobalAsyncThunk';
import { TypeFetchGetProfileResponse } from '../types';
import { fetchUpdateProfileAsyncThunk } from '@/features/EditProfile/model/EditProfileAsyncThunk';
import { TypeFetchUpdateProfileResponse } from '@/features/EditProfile/api';

type TypeMGlobalState = {
  pending: boolean,
  userId: string,
  firstName: string,
  secondName: string,
  globalAvatarSrc: string | null,
}

const initialState: TypeMGlobalState = {
  pending: true,
  userId: '',
  firstName: '',
  secondName: '',
  globalAvatarSrc: null,
};

const GlobalSlice = createSlice({
  name: 'Global',
  initialState,
  reducers: {
    setPending: (state, action: PayloadAction<boolean>) => ({ ...state, pending: action.payload }),
  },
  extraReducers: (builder) => builder
    .addCase(fetchProfileAsyncThunk.fulfilled, (state, action: PayloadAction<TypeFetchGetProfileResponse>) => ({
      ...state,
      userId: action.payload._id,
      firstName: action.payload.firstName,
      secondName: action.payload.secondName,
      globalAvatarSrc: action.payload.avatarSrc,
    }))
    .addCase(fetchUpdateProfileAsyncThunk.fulfilled, (state, action: PayloadAction<TypeFetchUpdateProfileResponse>) => ({
      ...state,
      firstName: action.payload.firstName,
      secondName: action.payload.secondName,
      globalAvatarSrc: action.payload.avatarSrc,
    })),
});

export default GlobalSlice.reducer;

export const { setPending } = GlobalSlice.actions;
