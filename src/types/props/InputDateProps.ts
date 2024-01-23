import { ClassNameProps } from './ClassNameProps';
import { InputProps } from './InputProps';

export declare interface InputDateProps extends ClassNameProps {
    Item: React.FC<InputProps>;
    id: string;
    ariaLabel: string;
    name: string;
    onChangeDate?: (value: Date) => void;
    onChangeTime?: (value: Date) => void;
    onChange?: (value: Date) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    value?: Date;
    autoFocus?: boolean;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    isInvalid?: boolean;
    readOnly?: boolean;
}
