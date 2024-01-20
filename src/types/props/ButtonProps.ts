import { ClassNameProps } from './ClassNameProps';
import { HasChildrenProps } from './HasChildrenProps';

export declare interface ButtonProps extends HasChildrenProps, ClassNameProps {
    ariaLabel?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
