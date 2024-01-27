import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B3 = ({ children, id, className }: TypographyProps) => {
  return (
    <p id={id} className={classNames('text-base', className)}>
      {children}
    </p>
  );
};

export default B3;
