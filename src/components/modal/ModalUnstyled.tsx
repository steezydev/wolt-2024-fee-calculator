import ButtonRound from '@/components/button/ButtonRound';
import CloseIcon from '@/components/icons/CloseIcon';
import B2 from '@/components/typography/B2';
import { classNames } from '@/helpers/classNames';
import useClickOutside from '@/hooks/useClickOutside';
import { ModalProps } from '@/types/props/ModalProps';

const ModalUnstyled = ({
  id,
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  const ref = useClickOutside<HTMLDivElement>(() => onClose());

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role='dialog'
      ref={ref}
      className={classNames('absolute z-50 flex flex-col gap-3', className)}
      aria-modal='true'
      aria-labelledby={`dialogTitle` + id}
    >
      <div className='border-b border-b-neutral-light-100 dark:border-b-neutral-dark-100 pb-1 flex justify-between'>
        <B2
          id={`dialogTitle` + id}
          className='text-dark dark:text-white font-bold'
        >
          {title}
        </B2>
        <ButtonRound
          id={`closeModalButton` + id}
          onClick={onClose}
          ariaLabel='Close modal'
        >
          <CloseIcon className='w-4 h-4' />
        </ButtonRound>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ModalUnstyled;
