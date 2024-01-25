import { ClassNameProps } from '@/types/props/ClassNameProps';
import { InputType } from '@/types/shared/InputType';

export declare interface InputProps extends ClassNameProps {
    id: string;
    ariaLabel: string;
    type?: InputType;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    value?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    isInvalid?: boolean;
    readOnly?: boolean;
}
