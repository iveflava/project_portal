/* eslint-disable array-callback-return */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorCard } from '@/entities/ColorCard';
import s from './Events.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchGetEventsAsyncThunk } from '@/features/Main/model/MainAsyncThunk';
import { selectMainStateEvents, selectMainStatePendingEvents } from '@/features/Main/model/MainSelectors';
import { TypeEvent } from '@/features/Main/types';

const Events = () => {
  const navigate = useNavigate();
  const redirect = (url : string) => {
    navigate(url);
  };
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectMainStateEvents);
  const pendingEvents = useAppSelector(selectMainStatePendingEvents);

  useEffect(() => {
    dispatch(fetchGetEventsAsyncThunk({ redirect }));
  }, []);

  return (
    <div className={s.cards}>
      {
        pendingEvents
          ? null
          : (events.map((event: TypeEvent) => (
            <ColorCard
              key={event._id}
              mode={event.mode}
              heading={event.heading}
              text={event.text}
            />
          )))
      }
    </div>
  );
};

export default Events;
