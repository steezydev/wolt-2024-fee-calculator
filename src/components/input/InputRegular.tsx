import InputUnstyled from '@/components/input/InputUnstyled';
import { classNames } from '@/helpers/classNames';
import { InputProps } from '@/types/props/InputProps';
import React from 'react';

const InputRegular = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <InputUnstyled
        ref={ref}
        {...props}
        className={classNames(
          'rounded-xl border-2 bg-transparent border-neutral-light-100 placeholder:text-neutral-light-300 px-3 py-2.5 text-xl text-black leading-none',
          ' dark:border-neutral-dark-100 dark:placeholder:text-neutral-dark-300 dark:text-white',
          'group-hover:data-[invalid=false]:border-primary-300',
          'data-[invalid=true]:placeholder:text-error data-[invalid=true]:dark:placeholder:text-error',
          'data-[invalid=true]:border-error data-[invalid=true]:dark:border-error focus:data-[invalid=true]:border-primary-300 focus:data-[invalid=true]:dark:border-primary-300',
          'focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 focus:dark:border-primary-300',
          className
        )}
      />
    );
  }
);

// const InputRegular = ({ className, ...props }: InputProps) => {
//   return (
//     <InputUnstyled
//       {...props}
//       className={classNames(
//         'rounded-xl border-2 bg-transparent border-neutral-light-100 placeholder:text-neutral-light-300 px-3 py-2.5 text-xl text-black leading-none',
//         ' dark:border-neutral-dark-100 dark:placeholder:text-neutral-dark-300 dark:text-white',
//         'group-hover:data-[invalid=false]:border-primary-300',
//         'data-[invalid=true]:placeholder:text-error data-[invalid=true]:dark:placeholder:text-error',
//         'data-[invalid=true]:border-error data-[invalid=true]:dark:border-error focus:data-[invalid=true]:border-primary-300 focus:data-[invalid=true]:dark:border-primary-300',
//         'focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 focus:dark:border-primary-300',
//         className
//       )}
//     />
//   );
// };

export default InputRegular;
