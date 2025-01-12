/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import clsx from 'clsx';
import s from './Switch.module.scss';
import { TypeSwitchProps } from './types';

const Switch: FC<TypeSwitchProps> = ({
  onChange, checked, className, disabled,
}) => (
  <div className={clsx(s.wrapper, className)}>
    <label className={s.label}>
      <input className={s.input} onChange={onChange} checked={checked} type="checkbox" disabled={disabled} />
      <span className={s.span} style={disabled ? { opacity: '40%' } : {}} />
    </label>
  </div>
);

export default Switch;
