import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetFullProfileAsyncThunk } from './ProfileAsyncThunk';
import { TypeFetchGetFullProfileResponse } from '../api/ProfileApi';

type TypeProfileState = {
    firstName: string,
    secondName: string,
    role: string,
    city: string,
    country: string,
    aboutUser: string,
    instagram: string,
    mail: string,
    telegram: string,
    birthday: string,
    hardwareAndSoftware: string,
    books: string,
    avatarSrc: string,
};

const initialState: TypeProfileState = {
  firstName: '',
  secondName: '',
  role: '',
  city: '',
  country: '',
  aboutUser: '',
  instagram: '',
  mail: '',
  telegram: '',
  birthday: '',
  hardwareAndSoftware: '',
  books: '',
  avatarSrc: '',
};

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => builder
    .addCase(fetchGetFullProfileAsyncThunk.fulfilled, (state, action: PayloadAction<TypeFetchGetFullProfileResponse>) => ({
      ...state,
      firstName: action.payload.firstName,
      secondName: action.payload.secondName,
      role: action.payload.role,
      city: action.payload.city,
      country: action.payload.country,
      aboutUser: action.payload.aboutUser,
      birthday: action.payload.birthday,
      instagram: action.payload.accounts.instagram,
      mail: action.payload.accounts.mail,
      telegram: action.payload.accounts.telegram,
      hardwareAndSoftware: action.payload.hardwareAndSoftware,
      books: action.payload.books,
      avatarSrc: action.payload.avatarSrc,
    })),
});

export default ProfileSlice.reducer;

// export const {} = ProfileSlice.actions;
