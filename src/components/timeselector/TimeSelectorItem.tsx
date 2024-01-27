import ButtonUnstyled from '@/components/button/ButtonUnstyled';
import { classNames } from '@/helpers/classNames';
import { TimeSelectorItemProps } from '@/types/props/TimeSelectorItemProps';

const TimeSelectorItem = ({
  value,
  type,
  isActive,
  onClick,
}: TimeSelectorItemProps) => (
  <ButtonUnstyled
    id={`select${type.charAt(0).toUpperCase() + type.slice(1)}${value}Button`}
    ariaLabel={`Select ${value} ${type}`}
    type='button'
    className={classNames(
      'px-3 py-1 rounded-lg hover:bg-primary-100 w-full text-black dark:text-white text-base',
      isActive && 'bg-primary-300 text-white hover:bg-primary-300'
    )}
    onClick={onClick}
  >
    {value.toString().padStart(2, '0')}
  </ButtonUnstyled>
);

export default TimeSelectorItem;
