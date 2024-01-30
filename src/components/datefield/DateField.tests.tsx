import { DateFieldProps } from '@/types/props/DateFieldProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const mockOnDateChange = jest.fn();
const testDate = new Date(2024, 0, 17, 12, 0); // 17.01.2024 12:00

export const dateFieldRenderTests = (
  name: string,
  DateField: React.FC<DateFieldProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('matches snpashot', () => {
        const component = TestRenderer.create(
          <DateField
            date={testDate}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(
          <DateField
            date={testDate}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        expect(
          screen.getByDisplayValue('17.01.2024 12:00')
        ).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    describe('when asked to render with additional input props', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <DateField
            className='some-class'
            date={testDate}
            renderInput={(inputProps) => (
              <input
                name='testName'
                id='testId'
                className='some-class'
                {...inputProps}
              />
            )}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with additional input props', () => {
        render(
          <DateField
            className='some-class'
            date={testDate}
            renderInput={(inputProps) => (
              <input
                name='testName'
                id='testId'
                className='some-class'
                {...inputProps}
              />
            )}
          />
        );

        const input = screen.getByRole('textbox');

        expect(input).toHaveAttribute('name', 'testName');
        expect(input).toHaveAttribute('id', 'testId');
        expect(input).toHaveClass('some-class');
      });
    });
  });
};

export const dateFieldEventTests = (
  name: string,
  DateField: React.FC<DateFieldProps>
) => {
  describe(name, () => {
    describe('when asked to blur with valid date', () => {
      it('calls onDateChange with a new date on valid blur', () => {
        const { getByDisplayValue } = render(
          <DateField
            date={testDate}
            onDateChange={mockOnDateChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const input = getByDisplayValue('17.01.2024 12:00');
        fireEvent.change(input, { target: { value: '18.01.2024 15:00' } });
        fireEvent.blur(input);

        expect(mockOnDateChange).toHaveBeenCalledWith(expect.any(Date));
      });
    });

    describe('when asked to blur with invalid date', () => {
      it('reverts to the original date on invalid blur', () => {
        const { getByDisplayValue } = render(
          <DateField
            date={testDate}
            onDateChange={mockOnDateChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const input = getByDisplayValue('17.01.2024 12:00');
        fireEvent.change(input, { target: { value: 'invalid date' } });
        fireEvent.blur(input);

        expect(getByDisplayValue('17.01.2024 12:00')).toBeInTheDocument();
      });
    });
  });
};
