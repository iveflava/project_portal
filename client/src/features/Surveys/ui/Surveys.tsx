import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGetSurveysAsyncThunk, fetchSetVoteAsyncThunk } from '@/features/MainSidebar/model/MainSidebarAsyncThunk';
import { selectMainSidebarStateSurveys } from '@/features/MainSidebar/model/MainSidebarSelectors';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Survey } from '@/entities/Survey';
import { TypeSurvey } from '@/features/MainSidebar/types';

const Surveys = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };
  const surveys = useAppSelector(selectMainSidebarStateSurveys);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetSurveysAsyncThunk({ redirect }));
  }, []);

  return (
    <div>
      {
        surveys.map((survey: TypeSurvey) => (
          <Survey
            key={survey._id}
            heading={survey.heading}
            answers={survey.answers}
            userVoted={survey.userVoted}
            onVote={(answerText: string) => {
              dispatch(fetchSetVoteAsyncThunk({
                surveyId: survey._id, answerText, redirect,
              }));
            }}
          />
        ))
      }
    </div>
  );
};

export default Surveys;
