import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B4 = ({ children, className }: TypographyProps) => {
  return (
    <p className={classNames('text-sm text-black dark:text-white', className)}>
      {children}
    </p>
  );
};

export default B4;
