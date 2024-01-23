import { ClassNameProps } from './ClassNameProps';

export declare interface TimeSelectorProps extends ClassNameProps {
    selectedDateTime?: Date;
    onTimeChange: (hours: number, minutes: number) => void;
}
