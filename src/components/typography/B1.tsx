import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';
import React from 'react';

const B1 = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} {...props} className={classNames('text-xl ', className)}>
        {children}
      </p>
    );
  }
);

export default B1;
