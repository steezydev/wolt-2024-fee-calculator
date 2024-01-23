import { ClassNameProps } from './ClassNameProps';

export declare interface CalendarProps extends ClassNameProps {
    selectedDate?: Date;
    onDayClick?: (day: Date) => void;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
}
