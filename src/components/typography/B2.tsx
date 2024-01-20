import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B2 = ({ children, className }: TypographyProps) => {
  return (
    <p className={classNames('text-lg text-black dark:text-white', className)}>
      {children}
    </p>
  );
};

export default B2;
