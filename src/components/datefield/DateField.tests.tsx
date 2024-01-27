import { DateFieldProps } from '@/types/props/DateFieldProps';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
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
      it('renders', () => {
        const component = TestRenderer.create(
          <DateField
            date={testDate}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <DateField
            className='some-class'
            date={testDate}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to be initializes with the formatted date', () => {
      it('initializes with the formatted date', () => {
        const { getByDisplayValue } = render(
          <DateField
            date={testDate}
            onDateChange={mockOnDateChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );
        expect(getByDisplayValue('17.01.2024 12:00')).toBeInTheDocument();
      });
    });

    describe('when asked to update with date prop changes', () => {
      it('updates the input value when the date prop changes', () => {
        const { rerender, getByDisplayValue } = render(
          <DateField
            date={testDate}
            onDateChange={mockOnDateChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const newTestDate = new Date(2024, 0, 18, 15, 0); // 18.01.2024 15:00
        rerender(
          <DateField
            date={newTestDate}
            onDateChange={mockOnDateChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        expect(getByDisplayValue('18.01.2024 15:00')).toBeInTheDocument();
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
