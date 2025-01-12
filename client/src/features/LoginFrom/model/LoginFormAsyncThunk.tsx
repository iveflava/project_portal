/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin } from '../api/LoginFormApi';
import { setAccessTokenToLocaleStorage, setRefreshTokenToLocaleStorage } from '@/shared/lib/helpers';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';
import { clearState } from './LoginFormSlice';
import { addToast } from '@/features/Toaster/model/ToasterSlice';

export const fetchLoginAsyncThunk = createAsyncThunk(
  'Login/fetchLoginAsyncThunk',
  async ({ login, password, redirect }: {login: string, password: string, redirect: Function}, thunkAPI) => {
    try {
      const response = await fetchLogin({ login, password });
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        setRefreshTokenToLocaleStorage({ refreshToken });
        setAccessTokenToLocaleStorage({ accessToken });
        redirect(RoutePath[AppRoutes.MAIN]);
        thunkAPI.dispatch(clearState());
      }
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      if (message) {
        thunkAPI.dispatch(addToast({ type: 'red', message }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);
