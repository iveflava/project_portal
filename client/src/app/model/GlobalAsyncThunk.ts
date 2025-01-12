/* eslint-disable consistent-return */
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { getTokens, setAccessTokenToLocaleStorage, setRefreshTokenToLocaleStorage } from '@/shared/lib/helpers';
import { fetchAuthTokenRefresh, fetchAuthTokenVerify, fetchGetProfile } from '../api/GlobalApi';
import { AppRoutes, RoutePath } from '../providers/Router/routes';
import { setPending } from './GlobalSlice';

export const fetchTokenRefreshAsyncThunk = createAsyncThunk(
  'Global/fetchTokenRefresh',
  async ({
    redirect, asyncThunk, asyncThunkArgs,
  }: { redirect: Function, asyncThunk: AsyncThunk<any, any, any>, asyncThunkArgs: any }, thunkAPI) => {
    const { refreshToken } = getTokens();
    try {
      const response = await fetchAuthTokenRefresh(refreshToken);
      if (response.statusText === 'OK') {
        setAccessTokenToLocaleStorage({ accessToken: response.data.accessToken });
        setRefreshTokenToLocaleStorage({ refreshToken: response.data.refreshToken });
        thunkAPI.dispatch(asyncThunk(asyncThunkArgs));
      } else {
        setAccessTokenToLocaleStorage({ accessToken: '' });
        setRefreshTokenToLocaleStorage({ refreshToken: '' });
        redirect(RoutePath[AppRoutes.LOGIN]);
      }
      return { data: response.data, statusText: response.statusText };
    } catch (error: any) {
      setAccessTokenToLocaleStorage({ accessToken: '' });
      setRefreshTokenToLocaleStorage({ refreshToken: '' });
      redirect(RoutePath[AppRoutes.LOGIN]);
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);

export const fetchRefreshTokensAsyncThunk = createAsyncThunk(
  'Global/fetchAuthTokenVerifyAsyncThunk',
  async ({ redirect, isRefreshAfterVerify }: { redirect: Function, isRefreshAfterVerify?: boolean }, thunkAPI) => {
    try {
      const { refreshToken } = getTokens();
      const response = await fetchAuthTokenRefresh(refreshToken);
      if (response.statusText === 'OK') {
        const { accessToken, refreshToken } = response.data;
        setRefreshTokenToLocaleStorage({ refreshToken });
        setAccessTokenToLocaleStorage({ accessToken });
      } else {
        setRefreshTokenToLocaleStorage({ refreshToken: '' });
        setAccessTokenToLocaleStorage({ accessToken: '' });
        redirect(RoutePath[AppRoutes.LOGIN]);
      }
    } catch (error) {
      setRefreshTokenToLocaleStorage({ refreshToken: '' });
      setAccessTokenToLocaleStorage({ accessToken: '' });
      redirect(RoutePath[AppRoutes.LOGIN]);
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      if (isRefreshAfterVerify) thunkAPI.dispatch(setPending(false));
    }
  },
);

export const fetchAuthTokenVerifyAsyncThunk = createAsyncThunk(
  'Global/fetchAuthTokenVerifyAsyncThunk',
  async ({ redirect }: { redirect: Function }, thunkAPI) => {
    try {
      const { accessToken, refreshToken } = getTokens();
      const response = await fetchAuthTokenVerify(accessToken, refreshToken);
      if (response.statusText === 'OK') {
        thunkAPI.dispatch(setPending(false));
      } else {
        thunkAPI.dispatch(fetchRefreshTokensAsyncThunk({ redirect, isRefreshAfterVerify: true }));
      }
    } catch (error) {
      thunkAPI.dispatch(fetchRefreshTokensAsyncThunk({ redirect, isRefreshAfterVerify: true }));
      thunkAPI.rejectWithValue('');
    }
  },
);

export const fetchProfileAsyncThunk = createAsyncThunk(
  'Global/fetchProfileAsyncThunk',
  async ({ redirect }: { redirect: Function}, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const response = await fetchGetProfile(accessToken);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchProfileAsyncThunk,
          asyncThunkArgs: {
            redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);
