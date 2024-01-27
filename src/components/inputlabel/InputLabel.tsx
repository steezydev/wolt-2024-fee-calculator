import AlertOctagonIcon from '@/components/icons/AlertOctagonIcon';
import B3 from '@/components/typography/B3';
import { classNames } from '@/helpers/classNames';
import { withClassNames } from '@/hoc/StyleHoc';
import { InputLabelProps } from '@/types/props/InputLabelProps';

const InputLabel = ({
  label,
  id,
  children,
  errorMessage,
  className,
}: InputLabelProps) => {
  return (
    <div className={classNames('group flex flex-col gap-1', className)}>
      {withClassNames(children, 'peer order-2')}
      <label
        className={classNames(
          'text-neutral-light-300 dark:text-neutral-dark-300 text-sm font-semibold order-1',
          'peer-focus:text-primary-300 peer-data-[invalid=true]:text-error peer-data-[focused=true]:peer-data-[invalid=false]:text-primary-300'
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <div className='hidden order-3 peer-data-[invalid=true]:flex gap-1.5 items-center'>
        <AlertOctagonIcon className='w-5 h-5 text-error' />
        <B3 id={id + 'ErrorMessage'} className='text-error'>
          {errorMessage}
        </B3>
      </div>
    </div>
  );
};

export default InputLabel;
