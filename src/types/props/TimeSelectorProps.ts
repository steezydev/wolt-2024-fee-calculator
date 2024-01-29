import { ClassNameProps } from '@/types/props/ClassNameProps';

export declare interface TimeSelectorProps extends ClassNameProps {
    time?: Date;
    onChange?: (newHours: number | null, newMinutes: number | null) => void;
}
