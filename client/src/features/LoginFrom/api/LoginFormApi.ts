import axios from 'axios';

type TypeFetchLoginResponse = {
    accessToken: string,
    refreshToken: string,
}

export const fetchLogin = async (data: {login: string, password: string}) => {
  const response = await axios.post<TypeFetchLoginResponse>('/login', data);
  return response;
};
