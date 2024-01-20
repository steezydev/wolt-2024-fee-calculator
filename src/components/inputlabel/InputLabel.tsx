import { classNames } from '@/helpers/classNames';
import { withClassNames } from '@/hoc/StyleHoc';
import { InputLabelProps } from '@/types/props/InputLabelProps';

const InputLabel = ({ label, id, children, className }: InputLabelProps) => {
  return (
    <div className={classNames('group flex flex-col gap-1', className)}>
      {withClassNames(children, 'peer order-2')}
      <label
        className={classNames(
          'text-neutral-light-300 dark:text-neutral-dark-300 text-sm font-semibold order-1',
          'peer-focus:text-primary-300 peer-invalid:text-error'
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default InputLabel;
