import { ClassNameProps } from '@/types/props/ClassNameProps';
import { RenderInputProps } from '@/types/props/RenderInputProps';

export declare interface DateFieldProps extends ClassNameProps {
    date: Date;
    renderInput: (props: RenderInputProps) => React.ReactNode;
    onDateChange?: (date: Date) => void;
}
