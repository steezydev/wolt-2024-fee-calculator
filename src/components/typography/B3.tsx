import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B3 = ({ children, className }: TypographyProps) => {
  return <p className={classNames('text-base', className)}>{children}</p>;
};

export default B3;
