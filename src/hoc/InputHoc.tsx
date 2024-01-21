import { classNames } from '@/helpers/classNames';
import { IconProps } from '@/types/props/IconProps';
import { InputProps } from '@/types/props/InputProps';
import { useState } from 'react';

export function withInputField<T extends InputProps>(
  WrappedComponent: React.FC<T>
) {
  type InputFieldProps = T;
  const Component = (props: InputFieldProps) => {
    const [isValid, setIsValid] = useState(true);
    const [isFilled, setIsFilled] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      props.onChange && props.onChange(event);

      if (props.validate) {
        setIsValid(props.validate(newValue));
      }

      setIsFilled(newValue.length > 0);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      props.onBlur && props.onBlur(event);

      if (props.validate) {
        setIsValid(props.validate(props.value));
      }

      if (props.value) {
        setIsFilled(props.value.length > 0);
      } else setIsFilled(false);
    };

    return (
      <WrappedComponent
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={!isValid || !isFilled}
      />
    );
  };

  return Component;
}

export function wihtInputIcon<T extends InputProps>(
  WrappedComponent: React.FC<T>,
  Icon: React.FC<IconProps>
) {
  type InputFieldProps = T;
  const Component = (props: InputFieldProps) => {
    // Workaround for tailwind peer selector in InputLabel component
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      props.onBlur && props.onBlur(event);
      setIsFocused(false);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      props.onFocus && props.onFocus(event);
      setIsFocused(true);
    };

    return (
      <div
        data-invalid={props.isInvalid}
        data-focused={isFocused}
        className={classNames(
          'relative items-center inline-block',
          props.className
        )}
      >
        <WrappedComponent
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classNames('pl-10 w-full peer')}
        />
        <div className='absolute left-2 top-0 h-full flex items-center text-neutral-light-300 dark:text-neutral-dark-300 peer-data-[invalid=true]:text-error peer-focus:text-primary-300'>
          <Icon className='text-inherit' />
        </div>
      </div>
    );
  };

  return Component;
}
