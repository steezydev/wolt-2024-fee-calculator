import ButtonUnstyled from '@/components/button/ButtonUnstyled';
import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

const ButtonRound = ({ className, ...props }: ButtonProps) => {
  return (
    <ButtonUnstyled
      {...props}
      className={classNames(
        'rounded-full p-2 text-black dark:text-white',
        'hover:bg-primary-300/90 hover:text-white active:bg-primary-300/80',
        'disabled:bg-primary-300/60 disabled:text-white/40 disabled:cursor-not-allowed',
        'focus-visible:ring-4 focus-visible:ring-focus focus:outline-none focus-visible:outline-none',
        className
      )}
    />
  );
};

export default ButtonRound;
