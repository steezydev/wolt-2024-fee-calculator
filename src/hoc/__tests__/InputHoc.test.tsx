import InputRegular from '@/components/input/InputRegular';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { withInputIcon } from '../InputHoc';

const MockIcon = () => <div>Icon</div>;
const WithIconInput = withInputIcon(InputRegular, MockIcon);

describe('withInputIcon HOC', () => {
  it('renders WrappedComponent and Icon', () => {
    render(
      <WithIconInput id='testId' ariaLabel='Test label' name='testName' />
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards props to WrappedComponent', () => {
    render(
      <WithIconInput
        id='testId'
        ariaLabel='Test label'
        name='testName'
        placeholder='Test'
      />
    );

    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument();
  });

  it('handles focus and blur events', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    render(
      <WithIconInput
        id='testId'
        ariaLabel='Test label'
        name='testName'
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
    expect(input.parentElement).toHaveAttribute('data-focused', 'true');

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
    expect(input.parentElement).toHaveAttribute('data-focused', 'false');
  });
});
