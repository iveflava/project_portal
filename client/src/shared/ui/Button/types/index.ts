import { ButtonTypeMap } from '@mui/joy';
import React from 'react';
import { classes } from '../config';

export type TypeButtonMode = keyof typeof classes;

export type ButtonProps = {
    className?: string,
    mode: TypeButtonMode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
} & ButtonTypeMap['props'];
