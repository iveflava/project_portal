/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-unreachable */
import { FC } from 'react';
import PurpleBadge from './PurpleBadge';
import { TypeBadgeProps } from './types';

const Badge: FC<TypeBadgeProps> = ({ mode, text }) => {
  switch (mode) {
  case 'purple': return <PurpleBadge text={text} />;
    break;
  }
};

export default Badge;
