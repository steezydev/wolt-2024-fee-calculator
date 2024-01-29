import { ClassNameProps } from '@/types/props/ClassNameProps';
import { HasChildrenProps } from '@/types/props/HasChildrenProps';

export declare interface ButtonProps extends HasChildrenProps, ClassNameProps {
    id: string;
    ariaLabel: string;
    ariaSelected?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    buttonRef?: React.Ref<HTMLButtonElement>;
}
