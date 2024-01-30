import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';
import React from 'react';

const H1 = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={classNames(
          'font-display text-4xl sm:text-5xl font-bold subpixel-antialiased',
          className
        )}
      >
        {children}
      </p>
    );
  }
);

export default H1;
