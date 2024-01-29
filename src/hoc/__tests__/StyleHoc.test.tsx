import { withClassNames } from '@/hoc/StyleHoc';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const MockComponent = ({ className, ...props }: { className?: string }) => (
  <div className={className} {...props}>
    Test Content
  </div>
);

describe('withClassNames HOC', () => {
  it('forwards props correctly', () => {
    const WrappedComponent = <MockComponent data-testid='test' />;
    const ClassNamesComponent = withClassNames(WrappedComponent, 'extra-class');

    render(ClassNamesComponent);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
  it('merges class names correctly', () => {
    const WrappedComponent = (
      <MockComponent data-testid='test' className={'component-class'} />
    );
    const ClassNamesComponent = withClassNames(WrappedComponent, 'extra-class');

    render(ClassNamesComponent);

    expect(screen.getByTestId('test')).toHaveClass('extra-class');
    expect(screen.getByTestId('test')).toHaveClass('component-class');
  });
});
