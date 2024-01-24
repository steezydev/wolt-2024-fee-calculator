import { ClassNameProps } from './ClassNameProps';
import { RenderInputProps } from './RenderInputProps';

export declare interface DatePickerProps extends ClassNameProps {
    value: Date;
    renderInput: (props: RenderInputProps) => React.ReactNode;
    onDatetimeChange?: (value: Date) => void;
    onDateChange?: (value: Date) => void;
    onTimeChange?: (value: Date) => void;
}
