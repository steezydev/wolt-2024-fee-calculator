import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

import ButtonUnstyled from './ButtonUnstyled';

const ButtonPrimary = ({ className, ...props }: ButtonProps) => {
  return (
    <ButtonUnstyled
      {...props}
      className={classNames(
        'bg-primary-300 text-white text-lg font-bold py-3 rounded-xl',
        'hover:bg-primary-300/90 active:bg-primary-300/80',
        'disabled:bg-primary-300/60 disabled:text-white/40 disabled:cursor-not-allowed',
        className
      )}
    />
  );
};

export default ButtonPrimary;
