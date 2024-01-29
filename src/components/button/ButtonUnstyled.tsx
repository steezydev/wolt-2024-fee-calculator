import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

const ButtonUnstyled = ({
  id,
  children,
  ariaLabel,
  className,
  disabled,
  onClick,
  ariaSelected,
  type = 'button',
  buttonRef,
}: ButtonProps) => {
  return (
    <button
      ref={buttonRef}
      id={id}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-selected={ariaSelected}
      className={classNames('', className)}
      disabled={disabled}
      data-test-id={id}
    >
      {children}
    </button>
  );
};

export default ButtonUnstyled;
