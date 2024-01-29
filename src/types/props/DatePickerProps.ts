import { ClassNameProps } from '@/types/props/ClassNameProps';
import { RenderInputProps } from '@/types/props/RenderInputProps';

export declare interface DatePickerProps extends ClassNameProps {
    value: Date;
    renderInput: (props: RenderInputProps) => React.ReactNode;
    onChange: (value: Date) => void;
    onDateChange?: (value: Date) => void;
    onTimeChange?: (newHours: number | null, newMinutes: number | null) => void;
}
