import { ClassNameProps } from './ClassNameProps';

export declare type InputType =
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'range'
    | 'color';

export declare interface InputProps extends ClassNameProps {
    id: string;
    ariaLabel: string;
    type: InputType;
    name: string;
    onChange?: (value: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    validate?: (value: string) => boolean;
    value?: string | number;
    autoFocus?: boolean;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
}
