/* eslint-disable react/no-unused-prop-types */
import { Textarea as MuiTextarea } from '@mui/joy';
import { FC, forwardRef } from 'react';
import clsx from 'clsx';
import s from './Textarea.module.scss';
import { TypeTextareaProps } from './types';

const Textarea: FC<TypeTextareaProps> = forwardRef((props, ref) => {
  // eslint-disable-next-line
  const { error, className, color, autoComplete, ...otherProps } = props;
  const sx = {
    '--Textarea-focusedHighlight': 'var(--purple1) !important',
    width: '100%',
    minHeight: '90px',
    height: '90px',
    maxHeight: '90px',
    '&::before': {
      transition: 'all .1s',
    },
  };

  if (!error) {
    return (
      <MuiTextarea
        ref={ref as any}
        className={clsx(s.textarea, className)}
        color={color}
        autoComplete={autoComplete || 'off'}
        sx={sx}
        {...otherProps}
      />
    );
  }
  return (
    <MuiTextarea
      ref={ref as any}
      className={clsx(s.input, className, s.error)}
      autoComplete={autoComplete || 'off'}
      sx={sx}
      error={!!error}
      {...otherProps}
    />
  );
});

export default Textarea;
