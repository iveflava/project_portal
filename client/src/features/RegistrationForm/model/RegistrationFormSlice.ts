import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeRegistrationFormState = {
    login: string,
    errorLogin: string,
    password: string,
    errorPassword: string,
}

const initialState: TypeRegistrationFormState = {
  login: '',
  errorLogin: '',
  password: '',
  errorPassword: '',
};

const RegistrationFormSlice = createSlice({
  name: 'RegistrationForm',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => ({ ...state, login: action.payload }),
    setPassword: (state, action: PayloadAction<string>) => ({ ...state, password: action.payload }),
    setErrorLogin: (state, action: PayloadAction<string>) => ({ ...state, errorLogin: action.payload }),
    setErrorPassword: (state, action: PayloadAction<string>) => ({ ...state, errorPassword: action.payload }),
    clearState: (state) => ({
      ...state,
      login: '',
      errorLogin: '',
      password: '',
      errorPassword: '',
    }),
  },
  extraReducers: (builder) => builder,
});

export default RegistrationFormSlice.reducer;

export const {
  setLogin, setPassword, setErrorLogin, setErrorPassword, clearState,
} = RegistrationFormSlice.actions;
