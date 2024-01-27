import { ClassNameProps } from './ClassNameProps';
import { RenderInputProps } from './RenderInputProps';

export declare interface DatePickerProps extends ClassNameProps {
    value: Date;
    renderInput: (props: RenderInputProps) => React.ReactNode;
    onChange: (value: Date) => void;
    onDateChange?: (value: Date) => void;
    onTimeChange?: (newHours: number | null, newMinutes: number | null) => void;
}
