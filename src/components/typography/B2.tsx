import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B2 = ({ children, id, className }: TypographyProps) => {
  return (
    <p id={id} className={classNames('text-lg', className)}>
      {children}
    </p>
  );
};

export default B2;
