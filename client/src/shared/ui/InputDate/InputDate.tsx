import { FC, forwardRef } from 'react';
import clsx from 'clsx';
import { IMask, IMaskInput } from 'react-imask';
import s from './InputDate.module.scss';
import { TypeInputProps } from './types';

const InputDate: FC<TypeInputProps> = forwardRef((props, ref) => {
  // eslint-disable-next-line
  const { error, className, autoComplete, onChange, ...otherProps } = props;

  if (!error) {
    return (
      <IMaskInput
        mask={Date}
        pattern="d{.}`m{.}`Y"
        blocks={{
          d: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 2025,
          },
        }}
        onAccept={(value) => onChange({ target: { value } })}
        ref={ref as any}
        className={clsx(s.input, className)}
        autoComplete={autoComplete || 'off'}
        {...otherProps}
      />
    );
  }
  return (
    <IMaskInput
      mask={Date}
      pattern="d{.}`m{.}`Y"
      blocks={{
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 2025,
        },
      }}
      onAccept={(value) => onChange({ target: { value } })}
      ref={ref as any}
      className={clsx(s.input, className, s.error)}
      autoComplete={autoComplete || 'off'}
      {...otherProps}
    />
  );
});

export default InputDate;
