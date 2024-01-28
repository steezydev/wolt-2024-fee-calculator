import { classNames } from '@/helpers/classNames';

describe('classNames', () => {
    test('concatenates multiple string arguments', () => {
        expect(classNames('btn', 'btn-primary', 'active')).toBe(
            'btn btn-primary active'
        );
    });

    test('excludes undefined and false values', () => {
        expect(classNames('btn', undefined, 'active', false)).toBe(
            'btn active'
        );
    });

    test('excludes empty strings', () => {
        expect(classNames('btn', '', 'active')).toBe('btn active');
    });

    test('returns an empty string with no arguments', () => {
        expect(classNames()).toBe('');
    });

    test('returns an empty string with all falsy arguments', () => {
        expect(classNames(undefined, false, '')).toBe('');
    });

    test('handles mixed truthy and falsy arguments', () => {
        expect(classNames('btn', undefined, 'active', '', false)).toBe(
            'btn active'
        );
    });
});
