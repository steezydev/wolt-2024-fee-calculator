import useClickOutside from '@/hooks/useClickOutside';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('useClickOutside', () => {
  it('calls callback on outside click', () => {
    const callback = jest.fn();
    function TestComponent() {
      const ref = useClickOutside<HTMLDivElement>(callback);
      return <div ref={ref} data-testid='inside'></div>;
    }

    render(<TestComponent />);

    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(callback).toHaveBeenCalled();
  });

  it('does not call callback on inside click', () => {
    const callback = jest.fn();
    function TestComponent() {
      const ref = useClickOutside<HTMLDivElement>(callback);
      return <div ref={ref} data-testid='inside'></div>;
    }

    const { getByTestId } = render(<TestComponent />);

    act(() => {
      fireEvent.mouseDown(getByTestId('inside'));
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('cleans up event listeners on unmount', () => {
    const callback = jest.fn();
    function TestComponent() {
      const ref = useClickOutside<HTMLDivElement>(callback);
      return <div ref={ref}></div>;
    }

    const { unmount } = render(<TestComponent />);
    unmount();

    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
