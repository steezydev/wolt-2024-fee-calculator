import { ClassNameProps } from '@/types/props/ClassNameProps';
import { InputProps } from '@/types/props/InputProps';

export declare interface InputLabelProps extends ClassNameProps {
    label: string;
    id: string;
    children: React.FunctionComponentElement<InputProps>;
    required?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
}
