import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B2 = ({ children, className }: TypographyProps) => {
  return <p className={classNames('text-lg', className)}>{children}</p>;
};

export default B2;
