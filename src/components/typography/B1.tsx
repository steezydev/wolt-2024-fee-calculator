import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B1 = ({ children, id, className }: TypographyProps) => {
  return (
    <p id={id} className={classNames('text-xl ', className)}>
      {children}
    </p>
  );
};

export default B1;
