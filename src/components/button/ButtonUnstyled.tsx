import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

const ButtonUnstyled = ({
  children,
  ariaLabel,
  className,
  disabled,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classNames('', className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonUnstyled;
