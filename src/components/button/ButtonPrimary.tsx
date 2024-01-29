import ButtonUnstyled from '@/components/button/ButtonUnstyled';
import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

const ButtonPrimary = ({ className, ...props }: ButtonProps) => {
  return (
    <ButtonUnstyled
      {...props}
      className={classNames(
        'bg-primary-300 text-white text-lg font-bold py-3 rounded-xl',
        'hover:bg-primary-300/90 active:bg-primary-300/80',
        'disabled:bg-neutral-400 disabled:dark:bg-neutral-700 disabled:text-white/60 disabled:cursor-not-allowed',
        'focus-visible:ring-4 focus-visible:ring-focus focus:outline-none focus-visible:outline-none',
        className
      )}
    />
  );
};

export default ButtonPrimary;
