import axios from 'axios';

export type TypeFetchGetFullProfileResponse = {
  _id: string,
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
  avatarSrc: string,
}

export const fetchGetFullProfile = async (accessToken: string, id: string) => {
  const response = await axios.get<TypeFetchGetFullProfileResponse>(`/full-profile/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
