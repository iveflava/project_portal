import { FC } from 'react';
import clsx from 'clsx';
import s from './InputContainer.module.scss';
import { TypeInputContainerProps } from './types';

const InputContainer: FC<TypeInputContainerProps> = ({
  children, label, className, error,
}) => (
  <div className={clsx(s.container, className)}>
    <div className={s.label}>{label}</div>
    {children}
    {error ? <div className={s.error}>{error}</div> : null}
  </div>

);

export default InputContainer;
