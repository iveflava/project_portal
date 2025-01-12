import axios from 'axios';
import { TypeFetchAuthTokenRefreshData, TypeFetchAuthTokenVerifyResponse, TypeFetchGetProfileResponse } from '../types';

export const fetchAuthTokenRefresh = async (refreshToken: string) => {
  const response = await axios.post<TypeFetchAuthTokenRefreshData>('/refresh', { refreshToken });
  return response;
};

export const fetchAuthTokenVerify = async (accessToken: string, refreshToken: string) => {
  const response = await axios.post<TypeFetchAuthTokenVerifyResponse>('/verify', { refreshToken }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const fetchGetProfile = async (accessToken: string) => {
  const response = await axios.get<TypeFetchGetProfileResponse>('/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
