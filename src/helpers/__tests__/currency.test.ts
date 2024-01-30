import { formatCurrency } from '../currency';

describe('formatCurrency', () => {
    test('formats EUR correctly', () => {
        expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    });

    test('formats USD correctly', () => {
        expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });

    test('formats large numbers correctly', () => {
        expect(formatCurrency(123456789.01, 'USD')).toBe('$123,456,789.01');
    });

    test('formats negative values correctly', () => {
        expect(formatCurrency(-1234.56, 'USD')).toBe('-$1,234.56');
    });

    test('formats fractional values correctly', () => {
        expect(formatCurrency(0.99, 'USD')).toBe('$0.99');
    });
});
