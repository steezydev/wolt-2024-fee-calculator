import { ClassNameProps } from '@/types/props/ClassNameProps';
import { HasChildrenProps } from '@/types/props/HasChildrenProps';

export declare interface ModalProps extends HasChildrenProps, ClassNameProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}
