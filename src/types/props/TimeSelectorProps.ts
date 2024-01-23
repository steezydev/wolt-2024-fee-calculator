import { ClassNameProps } from './ClassNameProps';

export declare interface TimeSelectorProps extends ClassNameProps {
    time?: Date;
    onTimeChange?: (value: Date) => void;
}
