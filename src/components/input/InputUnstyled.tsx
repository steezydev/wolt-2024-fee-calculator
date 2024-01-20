import { classNames } from '@/helpers/classNames';
import { InputProps } from '@/types/props/InputProps';
import React, { useState } from 'react';

const InputUnstyled = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      ariaLabel,
      type,
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      onInput,
      validate,
      placeholder,
      min,
      max,
      autoFocus = false,
      disabled = false,
      required = false,
      className,
    },
    ref
  ) => {
    const [isValid, setIsValid] = useState(true);

    //TODO: Make validation
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange && onChange(newValue);
      if (validate) {
        setIsValid(validate(newValue));
      }
    };

    return (
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        aria-label={ariaLabel}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={classNames(
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        onInput={onInput}
        autoFocus={autoFocus}
        aria-invalid={!isValid}
        data-test-id={id}
        min={min}
        max={max}
      />
    );
  }
);

export default InputUnstyled;
