import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeFetchGetFullProfileResponse } from '@/features/Profile/api/ProfileApi';
import { fetchGetFullProfileAsyncThunk } from '@/features/Profile/model/ProfileAsyncThunk';
import { fetchUpdateProfileAsyncThunk } from './EditProfileAsyncThunk';
import { TypeFetchUpdateProfileResponse } from '../api';

type TypeEditProfileState = {
    firstName: string,
    errorFirstName: string,
    secondName: string,
    errorSecondName: string,
    role: string,
    errorRole: string,
    city: string,
    errorCity: string,
    country: string,
    errorCountry: string,
    aboutUser: string,
    errorAboutUser: string,
    instagram: string,
    errorInstagram: string,
    mail: string,
    errorMail: string,
    telegram: string,
    errorTelegram: string,
    birthday: string,
    errorBirthday: string,
    hardwareAndSoftware: string,
    errorHardwareAndSoftware: string,
    books: string,
    errorBooks: string,
    avatarSrc: string,
    avatarBlob: Blob,
};

const initialState: TypeEditProfileState = {
  firstName: '',
  errorFirstName: '',
  secondName: '',
  errorSecondName: '',
  role: '',
  errorRole: '',
  city: '',
  errorCity: '',
  country: '',
  errorCountry: '',
  aboutUser: '',
  errorAboutUser: '',
  instagram: '',
  errorInstagram: '',
  mail: '',
  errorMail: '',
  telegram: '',
  errorTelegram: '',
  birthday: '',
  errorBirthday: '',
  hardwareAndSoftware: '',
  errorHardwareAndSoftware: '',
  books: '',
  errorBooks: '',
  avatarSrc: '',
  avatarBlob: null,
};

const EditProfileSlice = createSlice({
  name: 'EditProfile',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => ({
      ...state,
      firstName: action.payload,
      errorFirstName: '',
    }),
    setSecondName: (state, action: PayloadAction<string>) => ({
      ...state,
      secondName: action.payload,
      errorSecondName: '',
    }),
    setRole: (state, action: PayloadAction<string>) => ({
      ...state,
      role: action.payload,
      errorRole: '',
    }),
    setCity: (state, action: PayloadAction<string>) => ({
      ...state,
      city: action.payload,
      errorCity: '',
    }),
    setCountry: (state, action: PayloadAction<string>) => ({
      ...state,
      country: action.payload,
      errorCountry: '',
    }),
    setAboutUser: (state, action: PayloadAction<string>) => ({
      ...state,
      aboutUser: action.payload,
      errorAboutUser: '',
    }),
    setInstagram: (state, action: PayloadAction<string>) => ({
      ...state,
      instagram: action.payload,
      errorInstagram: '',
    }),
    setMail: (state, action: PayloadAction<string>) => ({
      ...state,
      mail: action.payload,
      errorMail: '',
    }),
    setTelegram: (state, action: PayloadAction<string>) => ({
      ...state,
      telegram: action.payload,
      errorTelegram: '',
    }),
    setBirthday: (state, action: PayloadAction<string>) => ({
      ...state,
      birthday: action.payload,
      errorBirthday: '',
    }),
    setHardwareAndSoftware: (state, action: PayloadAction<string>) => ({
      ...state,
      hardwareAndSoftware: action.payload,
      errorHardwareAndSoftware: '',
    }),
    setBooks: (state, action: PayloadAction<string>) => ({
      ...state,
      books: action.payload,
      errorBooks: '',
    }),
    setAvatarSrc: (state, action: PayloadAction<string>) => ({
      ...state,
      avatarSrc: action.payload,
    }),
    setAvatarBlob: (state, action: PayloadAction<Blob>) => ({
      ...state,
      avatarBlob: action.payload,
    }),
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
    }))
    .addCase(fetchUpdateProfileAsyncThunk.fulfilled, (state, action: PayloadAction<TypeFetchUpdateProfileResponse>) => ({
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
      avatarBlob: null,
    })),
});

export default EditProfileSlice.reducer;

export const {
  setFirstName, setSecondName, setRole,
  setCity, setCountry, setAboutUser,
  setInstagram, setMail, setTelegram,
  setBirthday, setHardwareAndSoftware, setBooks,
  setAvatarSrc, setAvatarBlob,
} = EditProfileSlice.actions;
