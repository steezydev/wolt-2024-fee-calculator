import { ClassNameProps } from './ClassNameProps';
import { HasChildrenProps } from './HasChildrenProps';

export declare interface ButtonProps extends HasChildrenProps, ClassNameProps {
    id: string;
    ariaLabel: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
