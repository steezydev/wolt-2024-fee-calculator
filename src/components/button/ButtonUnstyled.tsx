import { classNames } from '@/helpers/classNames';
import { ButtonProps } from '@/types/props/ButtonProps';

const ButtonUnstyled = ({
  id,
  children,
  ariaLabel,
  className,
  disabled,
  onClick,
  type,
  buttonRef,
}: ButtonProps) => {
  // Preventing form submission on button click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <button
      ref={buttonRef}
      id={id}
      type={type}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={classNames('', className)}
      disabled={disabled}
      data-test-id={id}
    >
      {children}
    </button>
  );
};

export default ButtonUnstyled;
