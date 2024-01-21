import { ClassNameProps } from '@/types/props/ClassNameProps';
import { HasChildrenProps } from '@/types/props/HasChildrenProps';
import { Currency } from '@/types/shared/Currency';

export declare interface CalculationResultProps
    extends ClassNameProps,
        HasChildrenProps {
    result: number;
    currency?: Currency;
}
