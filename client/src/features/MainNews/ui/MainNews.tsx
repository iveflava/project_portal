import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectMainStateNews, selectMainStatePendingNews } from '@/features/Main/model/MainSelectors';
import { TypeNews } from '../../Main/types';
import SkeletonNews from './SkeletonNews';
import { NewsCard } from '@/entities/NewsCard';
import { fetchGetNewsAsyncThunkk } from '@/features/Main/model/MainAsyncThunk';
import { setPendingNews } from '@/features/Main/model/MainSlice';
import s from './MainNews.module.scss';

const MainNews = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    navigate(url);
  };
  const dispatch = useAppDispatch();
  const pendingNews = useAppSelector(selectMainStatePendingNews);
  const news = useAppSelector(selectMainStateNews);

  useEffect(() => {
    dispatch(fetchGetNewsAsyncThunkk({ redirect }));
  }, []);

  // NOTE: Для того чтобы при повторном открытии странице не было дерганий
  useEffect(() => () => {
    dispatch(setPendingNews(true));
  }, []);

  return (
    <div className={s.list}>
      {
        pendingNews
          ? <SkeletonNews />
          : (news.map((el: TypeNews) => (
            <NewsCard
              key={el._id}
              heading={el.heading}
              img={el.img}
              timestamp={el.timestamp}
            />
          )))
      }
    </div>
  );
};

export default MainNews;
