import ButtonUnstyled from '@/components/button/ButtonUnstyled';
import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

const ButtonSecondary = ({ className, ...props }: ButtonProps) => {
  return (
    <ButtonUnstyled
      {...props}
      className={classNames(
        'bg-primary-100 text-lg font-bold rounded-xl',
        'hover:bg-primary-300/20 active:bg-primary-300/50',
        'disabled:bg-neutral-light-100 disabled:dark:bg-neutral-dark-100 disabled:text-white/40 disabled:cursor-not-allowed',
        'focus-visible:ring-4 focus-visible:ring-focus focus:outline-none focus-visible:outline-none',
        className
      )}
    />
  );
};

export default ButtonSecondary;
