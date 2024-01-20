import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B1 = ({ children, className }: TypographyProps) => {
  return (
    <p className={classNames('text-xl text-black dark:text-white', className)}>
      {children}
    </p>
  );
};

export default B1;
