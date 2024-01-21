import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';

const H1 = ({ children, className }: TypographyProps) => {
  return (
    <h1
      className={classNames(
        'font-display text-4xl sm:text-5xl font-bold subpixel-antialiased',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default H1;
