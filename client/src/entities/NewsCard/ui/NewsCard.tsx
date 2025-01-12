/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react';
import s from './NewsCard.module.scss';
import { formattedDateForNews } from '@/shared/lib/helpers';

type TypeNewsCardProps = {
    heading: string,
    img: string,
    timestamp: number,
};

const NewsCard: FC<TypeNewsCardProps> = ({ heading, img, timestamp }) => (
  <div className={s.wrapper}>
    <img
      src={img}
      className={s.img}
    />
    <div className={s.body}>
      <div className={s.date}>{formattedDateForNews(new Date(timestamp))}</div>
      <div className={s.heading}>{heading}</div>
    </div>
  </div>
);

export default NewsCard;
