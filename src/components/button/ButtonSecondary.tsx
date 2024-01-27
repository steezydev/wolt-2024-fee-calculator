import ButtonUnstyled from '@/components/button/ButtonUnstyled';
import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

const ButtonSecondary = ({ className, ...props }: ButtonProps) => {
  return (
    <ButtonUnstyled
      {...props}
      className={classNames(
        'bg-primary-100 text-white text-lg font-bold py-3 rounded-xl',
        'hover:bg-primary-300/40 active:bg-primary-300/80',
        'disabled:bg-primary-300/60 disabled:text-white/40 disabled:cursor-not-allowed',
        'focus-visible:ring-4 focus-visible:ring-focus focus:outline-none focus-visible:outline-none',
        className
      )}
    />
  );
};

export default ButtonSecondary;
