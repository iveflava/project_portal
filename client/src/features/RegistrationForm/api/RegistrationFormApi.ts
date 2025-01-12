import axios from 'axios';

type TypeFetchRegistration = {
    accessToken: string,
    refreshToken: string,
}

export const fetchRegistration = async (data: {login: string, password: string}) => {
  const response = await axios.post<TypeFetchRegistration>('/registration', data);
  return response;
};
