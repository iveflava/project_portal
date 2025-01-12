import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './Anchor.module.scss';
import { TypeAnchorProps } from './types';

const Anchor: FC<TypeAnchorProps> = ({ children, to, className }) => (
  <Link
    className={clsx(s.anchor, className)}
    to={to}
  >
    {children}
  </Link>
);

export default Anchor;
