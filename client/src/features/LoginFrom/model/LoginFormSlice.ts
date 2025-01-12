import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeLoginFormState = {
    login: string,
    errorLogin: string,
    password: string,
    errorPassword: string,
}

const initialState: TypeLoginFormState = {
  login: '',
  errorLogin: '',
  password: '',
  errorPassword: '',
};

const LoginFormSlice = createSlice({
  name: 'LoginForm',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => ({ ...state, login: action.payload, errorLogin: '' }),
    setPassword: (state, action: PayloadAction<string>) => ({ ...state, password: action.payload, errorPassword: '' }),
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

export default LoginFormSlice.reducer;

export const {
  setLogin, setPassword, setErrorLogin, setErrorPassword, clearState,
} = LoginFormSlice.actions;
