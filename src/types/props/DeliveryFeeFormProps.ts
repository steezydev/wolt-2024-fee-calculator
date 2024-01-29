import { DeliveryFeeFormData } from '@/types/data/DeliveryFeeFormData';
import { ClassNameProps } from '@/types/props/ClassNameProps';

export declare interface DeliveryFeeFormProps extends ClassNameProps {
    onSubmit: (data: DeliveryFeeFormData) => void;
    ariaLabeledBy?: string;
}
