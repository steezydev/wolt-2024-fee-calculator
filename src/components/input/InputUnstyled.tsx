import { classNames } from '@/helpers/classNames';
import { InputProps } from '@/types/props/InputProps';
import React from 'react';

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
      placeholder,
      min,
      max,
      autoFocus = false,
      disabled = false,
      required = false,
      isInvalid = false,
      className,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-required={required}
        placeholder={placeholder}
        className={classNames(
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        onInput={onInput}
        autoFocus={autoFocus}
        aria-invalid={isInvalid}
        data-invalid={isInvalid}
        data-test-id={id}
        min={min}
        max={max}
      />
    );
  }
);

export default InputUnstyled;
