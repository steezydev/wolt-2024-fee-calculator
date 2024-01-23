import { ValidateResponse } from '@/types/data/ValidateResponse';
import { UseInputOptions } from '@/types/shared/UseInputOptions';
import { useState } from 'react';

// Regex for validating integer input
const integerRegex = /^[+-]?[0-9]+$/;

// Regex for validating float (numeric) input
const floatRegex = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

const useInput = (initialValue: string, options: UseInputOptions = {}) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('Invalid value');
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const isFilled = value !== '';

    const validate = (inputValue: string): ValidateResponse => {
        if (options.required && inputValue.trim() === '') {
            return { isValid: false, message: 'This field is required' };
        } else if (options.regex && !options.regex.test(inputValue)) {
            return { isValid: false, message: 'Invalid format' };
        } else if (
            options.type === 'integer' &&
            inputValue !== '' &&
            !integerRegex.test(inputValue)
        ) {
            return { isValid: false, message: 'Must be an integer' };
        } else if (
            options.type === 'numeric' &&
            inputValue !== '' &&
            !floatRegex.test(inputValue)
        ) {
            return { isValid: false, message: 'Must be a float number' };
        }

        return { isValid: true, message: '' };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (
            (options.type === 'integer' || options.type === 'numeric') &&
            isNaN(Number(inputValue))
        ) {
            return;
        }

        const validationResult = validate(inputValue);
        if (validationResult.isValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
            setError(validationResult.message);
        }
        if (!validationResult.isValid && inputValue !== '') {
            // If there's a validation error, don't update the value unless it's empty (to allow clearing the field).
            return;
        }
        setValue(inputValue);
    };

    const handleTouch = () => {
        setIsTouched(true);
        if (options.required && value === '') {
            setIsValid(false);
            setError('This field is required');
        }
    };

    return {
        value,
        setValue,
        isValid: isValid || !isTouched,
        isFilled,
        error,
        handleChange,
        handleTouch,
    };
};

export default useInput;
