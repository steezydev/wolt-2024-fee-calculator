import { classNames } from '@/helpers/classNames';
import { TypographyProps } from '@/types/props/TypographyProps';
import React from 'react';

const B4 = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} {...props} className={classNames('text-sm', className)}>
        {children}
      </p>
    );
  }
);

export default B4;
