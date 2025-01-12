import axios from 'axios';
import { TypeTeam } from '../types';

export const fetchGetTeams = async (accessToken: string) => {
  const response = await axios.get<TypeTeam[]>('/teams', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const fetchJoinTeam = async (accessToken: string, id:string) => {
  const response = await axios.get<TypeTeam>(`/teams/${id}/add-member`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
