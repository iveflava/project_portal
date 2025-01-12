import clsx from 'clsx';
import { FC } from 'react';
import s from './Badge.module.scss';
import { TypeBadgeProps } from './types';

const PurpleBadge: FC<Omit<TypeBadgeProps, 'mode'>> = ({ text }) => (
  <div className={clsx(s.wrapper, s.purple)}>{text}</div>
);

export default PurpleBadge;
