import { ClassNameProps } from '@/types/props/ClassNameProps';

import { InputProps } from './InputProps';

export declare interface InputLabelProps extends ClassNameProps {
    label: string;
    id: string;
    children: React.FunctionComponentElement<InputProps>;
}
