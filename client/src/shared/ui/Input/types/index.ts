import { InputTypeMap } from '@mui/joy';

export type TypeInputProps = {
    className?: string;
    placeholder?: string;
    type?: string;
    onChange?: (val: any) => void;
    value?: string;
    name?: string;
    id?: string;
    autoComplete?: string;
    maxLength?: number;
    pattern?: string;
    ref?: any;
    onKeyDown?: (val: any) => void;
    onFocus?: (val: any) => void;
    onBlur?: (val: any) => void;
    error?: boolean | string;
} & Omit<InputTypeMap['props'], 'error'>;
