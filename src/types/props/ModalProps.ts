import { ClassNameProps } from './ClassNameProps';
import { HasChildrenProps } from './HasChildrenProps';

export declare interface ModalProps extends HasChildrenProps, ClassNameProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}
