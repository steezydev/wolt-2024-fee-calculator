import { TimeSelectorType } from '@/types/shared/TimeSelectorType';

export declare interface TimeSelectorItemProps {
    value: number;
    type: TimeSelectorType;
    isActive?: boolean;
    onClick?: () => void;
}
