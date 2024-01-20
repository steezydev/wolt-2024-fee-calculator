import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const B3 = ({ children, className }: TypographyProps) => {
  return (
    <p
      className={classNames('text-base text-black dark:text-white', className)}
    >
      {children}
    </p>
  );
};

export default B3;
