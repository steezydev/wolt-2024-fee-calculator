import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B4 = ({ children, id, className }: TypographyProps) => {
  return (
    <p id={id} className={classNames('text-sm ', className)}>
      {children}
    </p>
  );
};

export default B4;
