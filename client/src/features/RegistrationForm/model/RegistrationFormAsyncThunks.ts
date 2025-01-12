/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRegistration } from '../api/RegistrationFormApi';
import { AppRoutes, RoutePath } from '@/app/providers/Router/routes';
import { setAccessTokenToLocaleStorage, setRefreshTokenToLocaleStorage } from '@/shared/lib/helpers';
import { clearState } from './RegistrationFormSlice';
import { addToast } from '@/features/Toaster/model/ToasterSlice';

export const fetchRegistrationAsyncThunk = createAsyncThunk(
  'Registration/fetchRegistrationAsyncThunk',
  async ({ login, password, redirect }: {login: string, password: string, redirect: Function}, thunkAPI) => {
    try {
      const response = await fetchRegistration({ login, password });
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
