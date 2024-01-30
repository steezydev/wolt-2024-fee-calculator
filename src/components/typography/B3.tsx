import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';
import React from 'react';

const B3 = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} {...props} className={classNames('text-base', className)}>
        {children}
      </p>
    );
  }
);

export default B3;
