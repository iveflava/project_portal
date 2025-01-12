import axios from 'axios';
import { TypeEvent, TypeNews } from '../types';

export const fetchGetNews = async (accessToken: string) => {
  const response = await axios.get<TypeNews[]>('/main-news', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const fetchGetEvents = async (accessToken: string) => {
  const response = await axios.get<TypeEvent[]>('/main-events', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
