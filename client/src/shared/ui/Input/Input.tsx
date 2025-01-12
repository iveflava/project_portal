/* eslint-disable react/no-unused-prop-types */
import { Input as MuiInput } from '@mui/joy';
import { FC, forwardRef } from 'react';
import clsx from 'clsx';
import s from './Input.module.scss';
import { TypeInputProps } from './types';

const Input: FC<TypeInputProps> = forwardRef((props, ref) => {
  // eslint-disable-next-line
  const { error, className, color, autoComplete, ...otherProps } = props;
  const sx = {
    '--Input-focusedHighlight': 'var(--purple1) !important',
    '&::before': {
      transition: 'all .1s',
    },
  };

  if (!error) {
    return (
      <MuiInput
        ref={ref as any}
        className={clsx(s.input, className)}
        color={color}
        autoComplete={autoComplete || 'off'}
        sx={sx}
        {...otherProps}
      />
    );
  }
  return (
    <MuiInput
      ref={ref as any}
      className={clsx(s.input, className, s.error)}
      autoComplete={autoComplete || 'off'}
      sx={sx}
      error={!!error}
      {...otherProps}
    />
  );
});

export default Input;
