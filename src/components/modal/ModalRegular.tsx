import { classNames } from '@/helpers/classNames';
import { ModalProps } from '@/types/props/ModalProps';

import ModalUnstyled from './ModalUnstyled';

const ModalRegular = ({ className, ...props }: ModalProps) => {
  return (
    <ModalUnstyled
      {...props}
      className={classNames(
        'bg-white dark:bg-black border-2 rounded-xl border-primary-300 flex flex-row',
        className
      )}
    />
  );
};

export default ModalRegular;
