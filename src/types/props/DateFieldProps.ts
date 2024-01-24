import { ClassNameProps } from './ClassNameProps';
import { RenderInputProps } from './RenderInputProps';

export declare interface DateFieldProps extends ClassNameProps {
    date: Date;
    renderInput: (props: RenderInputProps) => React.ReactNode;
    onDateChange?: (date: Date) => void;
}
