/* eslint-disable jsx-a11y/alt-text */
import clsx from 'clsx';
import s from './SkeletonNewsCard.module.scss';

const SkeletonNewsCard = () => (
  <div className={s.wrapper}>
    <div
      className={clsx(s.img, s.skeleton_background)}
    />
    <div className={s.body}>
      <div className={clsx(s.date, s.skeleton_background)} />
      <div className={clsx(s.heading, s.skeleton_background)} />
    </div>
  </div>
);

export default SkeletonNewsCard;
