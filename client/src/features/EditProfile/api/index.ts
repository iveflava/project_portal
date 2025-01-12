import axios from 'axios';

export type TypeFetchUpdateProfileResponse = {
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

export const fetchUpdateProfile = async (accessToken: string, id: string, formData: FormData) => {
  const response = await axios.patch<TypeFetchUpdateProfileResponse>(`/full-profile/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
