import { classNames } from '@/helpers/classNames';
import { InputProps } from '@/types/props/InputProps';

import InputUnstyled from './InputUnstyled';

const InputRegular = ({ className, ...props }: InputProps) => {
  return (
    <InputUnstyled
      {...props}
      className={classNames(
        'rounded-xl bg-white border-2 border-neutral-light-100 placeholder:text-neutral-light-300 px-3 py-3 text-xl text-black dark:text-white leading-none',
        'group-hover:valid:border-primary-300',
        'invalid:border-error ',
        'focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300',
        className
      )}
    />
  );
};

export default InputRegular;
