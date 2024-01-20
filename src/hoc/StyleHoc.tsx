import { classNames } from '@/helpers/classNames';
import { ClassNameProps } from '@/types/props/ClassNameProps';
import React from 'react';

export function withClassNames<T extends ClassNameProps>(
  WrappedComponent: React.FunctionComponentElement<T>,
  ...classes: string[]
) {
  const props: Partial<ClassNameProps> = {
    className: classNames(...classes, WrappedComponent.props.className),
  };
  return React.cloneElement(WrappedComponent, props);
}
