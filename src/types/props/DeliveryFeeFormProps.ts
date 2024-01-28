import { DeliveryFeeFormData } from '../data/DeliveryFeeFormData';
import { ClassNameProps } from './ClassNameProps';

export declare interface DeliveryFeeFormProps extends ClassNameProps {
    onSubmit: (data: DeliveryFeeFormData) => void;
    ariaLabeledBy?: string;
}
