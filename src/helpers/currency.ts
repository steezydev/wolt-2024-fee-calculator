import { Currency } from '@/types/shared/Currency';

export const formatCurrency = (value: number, currency: Currency) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(value);
};
