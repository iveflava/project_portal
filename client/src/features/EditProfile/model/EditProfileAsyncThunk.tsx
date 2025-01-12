import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTokens } from '@/shared/lib/helpers';
import { fetchUpdateProfile } from '../api';
import { fetchTokenRefreshAsyncThunk } from '@/app/model/GlobalAsyncThunk';
import { addToast } from '@/features/Toaster/model/ToasterSlice';

type TypeFetchUpdateProfileAsyncThunkArgs = {
  firstName: string,
  secondName: string,
  role: string,
  city: string,
  country: string,
  aboutUser: string,
  birthday: string,
  accounts: {
    mail: string,
    telegram: string,
    instagram: string,
  },
  hardwareAndSoftware: string,
  books: string,
  avatarBlob: Blob | string | null,
};

export const fetchUpdateProfileAsyncThunk = createAsyncThunk(
  'EditProfile/fetchUpdateProfile',
  async ({ id, data, redirect }: { id: string, data: TypeFetchUpdateProfileAsyncThunkArgs, redirect: Function }, thunkAPI) => {
    try {
      const { accessToken } = getTokens();
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('secondName', data.secondName);
      formData.append('role', data.role);
      formData.append('city', data.city);
      formData.append('country', data.country);
      formData.append('aboutUser', data.aboutUser);
      formData.append('birthday', data.birthday);
      formData.append('mail', data.accounts.mail);
      formData.append('telegram', data.accounts.telegram);
      formData.append('instagram', data.accounts.instagram);
      formData.append('hardwareAndSoftware', data.hardwareAndSoftware);
      formData.append('books', data.books);
      formData.append('avatarBlob', data.avatarBlob);
      const response = await fetchUpdateProfile(accessToken, id, formData);
      thunkAPI.dispatch(addToast({ type: 'green', message: 'Информация сохранена' }));
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(fetchTokenRefreshAsyncThunk({
          redirect,
          asyncThunk: fetchUpdateProfileAsyncThunk,
          asyncThunkArgs: {
            id, data, redirect,
          },
        }));
      }
      return thunkAPI.rejectWithValue('');
    }
  },
);
