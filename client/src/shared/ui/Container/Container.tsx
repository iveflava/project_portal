import clsx from 'clsx';
import { FC } from 'react';
import s from './Container.module.scss';
import { TypeContainerProps } from './types';

const Container: FC<TypeContainerProps> = ({ children, className }) => (
  <div className={clsx(s.container, className)}>{children}</div>
);

export default Container;
