import { FC } from 'react';
import clsx from 'clsx';
import s from './Header.module.scss';
import { Logout } from '@/features/Logout';

type TypeHeaderProps = {
    heading: string,
    className?: string,
}

const Header: FC<TypeHeaderProps> = ({ heading, className }) => (
  <div className={clsx(s.wrapper, className)}>
    <div className={s.heading}>{ heading }</div>
    <Logout />
  </div>
);

export default Header;
