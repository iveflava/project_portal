import { Button as MuiButton } from '@mui/joy';
import clsx from 'clsx';
import { FC, forwardRef } from 'react';
import s from './Button.module.scss';
import { ButtonProps } from './types';
import { classes } from './config';

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const {
    mode, className, children, ...otherProps
  } = props;
  return (
    <MuiButton
      ref={ref}
      className={clsx(
        s.button,
        classes[mode],
        className,
      )}
      {...otherProps}
    >
      {children}
    </MuiButton>
  );
});

export default Button;
