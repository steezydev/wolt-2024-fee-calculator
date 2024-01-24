import { TimeSelectorType } from '@/types/shared/TimeSelectorType';

export declare interface TimeSelectorColumnProps {
    type: TimeSelectorType;
    items: number[];
    currentItem: number;
    onChange: (value: number) => void;
}
