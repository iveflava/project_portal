import axios from 'axios';
import { TypeSurvey } from '../types';

export const fetchGetSurveys = async (accessToken: string) => {
  const response = await axios.get<TypeSurvey[]>('/survey', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const fetchSetVote = async (surveyId: string, answerText: string, accessToken: string) => {
  const response = await axios.post<{}>('/vote', { surveyId, answerText }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
