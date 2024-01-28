import {
    autoCompleteDate,
    dateTimeStringToDate,
    isValidDate,
    setDateDate,
} from '@/helpers/date';

describe('Date manipulations', () => {
    describe('isValidDate', () => {
        // Format
        test('should return false for incorrect format', () => {
            const input = '12-05-2023 14:30';
            expect(isValidDate(input)).toBeFalsy();
        });

        test('should return true for correct format', () => {
            const input = '12.05.2023 14:30';
            expect(isValidDate(input)).toBeTruthy();
        });

        // Logic
        test('should return false for invalid day', () => {
            const input = '32.01.2023 00:00'; // Day 32 is invalid
            expect(isValidDate(input)).toBeFalsy();
        });

        test('should return false for invalid month', () => {
            const input = '31.13.2023 00:00'; // Month 13 is invalid
            expect(isValidDate(input)).toBeFalsy();
        });

        test('should return true for a valid leap year date', () => {
            const input = '29.02.2024 00:00'; // 2024 is a leap year
            expect(isValidDate(input)).toBeTruthy();
        });

        test('should return false for invalid leap year date', () => {
            const input = '29.02.2023 00:00'; // 2023 is not a leap year
            expect(isValidDate(input)).toBeFalsy();
        });

        // Edge cases
        test('should handle end-of-month dates correctly', () => {
            const input = '30.04.2023 23:59'; // April has 30 days
            expect(isValidDate(input)).toBeTruthy();
        });

        test('should return false for invalid end-of-month dates', () => {
            const input = '31.04.2023 23:59'; // April does have only 30 days
            expect(isValidDate(input)).toBeFalsy();
        });

        test('should return true for boundary times', () => {
            expect(isValidDate('01.01.2023 00:00')).toBeTruthy();
            expect(isValidDate('01.01.2023 23:59')).toBeTruthy();
        });
    });

    describe('autoCompleteDate', () => {
        beforeAll(() => {
            jest.useFakeTimers().setSystemTime(
                new Date('2024-01-01').getTime()
            );
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        test('should return the same input for a complete and valid date-time string', () => {
            const input = '12.05.2023 14:30';
            const output = autoCompleteDate(input);
            expect(output).toBe('12.05.2023 14:30');
        });

        test('should auto-complete a partial date input', () => {
            const input = '5.6.';
            const output = autoCompleteDate(input);
            expect(output).toBe('05.06.2024 00:00'); // Assuming current date is 01.01.2024
        });

        test('should auto-complete a partial date-time input', () => {
            const input = '12.11. 2:';
            const output = autoCompleteDate(input);
            expect(output).toBe('12.11.2024 20:00');
        });

        test('should return the input as is for non-matching strings', () => {
            const input = 'not a date';
            const output = autoCompleteDate(input);
            expect(output).toBe('not a date');
        });

        test('should handle single-digit month and day with leading zero', () => {
            const input = '1.2.';
            const output = autoCompleteDate(input);
            expect(output).toBe('01.02.2024 00:00');
        });

        test('should auto-complete year when only two digits are provided', () => {
            const input = '01.01.24';
            const output = autoCompleteDate(input);
            expect(output).toBe('01.01.2024 00:00');
        });

        test('should handle edge case at the end of the year', () => {
            jest.setSystemTime(new Date('2024-12-31').getTime());
            const input = '31.12.';
            const output = autoCompleteDate(input);
            expect(output).toBe('31.12.2024 00:00');
        });
    });

    describe('dateTimeStringToDate', () => {
        test('correctly parses a valid date-time string', () => {
            const input = '28.01.2024 15:30';
            const result = dateTimeStringToDate(input);
            expect(result).toEqual(new Date(2024, 0, 28, 15, 30));
        });
    });

    describe('setDateDate', () => {
        test('correctly sets year, month, and day', () => {
            const originalDate = new Date(2024, 0, 28, 15, 30); // 28th Jan 2024 15:30
            const newDate = new Date(2023, 11, 25); // 25th Dec 2023
            const result = setDateDate(originalDate, newDate);
            expect(result.getFullYear()).toBe(2023);
            expect(result.getMonth()).toBe(11);
            expect(result.getDate()).toBe(25);
            expect(result.getHours()).toBe(15);
            expect(result.getMinutes()).toBe(30);
        });
    });
});
