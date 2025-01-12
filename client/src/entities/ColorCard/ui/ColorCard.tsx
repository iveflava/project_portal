/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
/* eslint-disable no-unreachable */
import { FC } from 'react';
import clsx from 'clsx';
import s from './ColorCard.module.scss';
import Calendar from '@/shared/assets/images/calendar.png';
import Cupcake from '@/shared/assets/images/cupcake.png';
import Sport from '@/shared/assets/images/sport.png';
import Call from '@/shared/assets/images/call.png';

type TypeColorCardProps = {
    mode: 'green' | 'red' | 'yellow' | 'purple',
    heading: string,
    text: string,
    className?: string,
};

const colorMode = {
  green: s.green,
  red: s.red,
  yellow: s.yellow,
  purple: s.purple,
};

const icons = {
  green: Calendar,
  red: Cupcake,
  yellow: Sport,
  purple: Call,
};

const ColorCard: FC<TypeColorCardProps> = ({
  mode, heading, text, className,
}) => (
  <div className={clsx(s.wrapper, colorMode[mode], className)}>
    <div className={s.img_container}>
      <img
        src={icons[mode]}
        className={s.img}
      />
    </div>
    <div className={s.heading}>
      {heading}
    </div>
    <div className={s.text}>
      {text}
    </div>
  </div>
);

export default ColorCard;
