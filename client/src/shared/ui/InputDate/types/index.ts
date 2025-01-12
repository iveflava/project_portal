export type TypeInputProps = {
    className?: string;
    type?: string;
    onChange?: (val: any) => void;
    value?: string;
    name?: string;
    id?: string;
    autoComplete?: string;
    maxLength?: number;
    pattern?: string;
    onKeyDown?: (val: any) => void;
    onFocus?: (val: any) => void;
    onBlur?: (val: any) => void;
    error?: boolean | string;
  }
