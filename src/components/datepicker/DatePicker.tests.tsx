import { DatePickerProps } from '@/types/props/DatePickerProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const mockOnDateChange = jest.fn();
const mockOnTimeChange = jest.fn();
const mockOnChange = jest.fn();
const testDate = new Date(2024, 0, 17, 12, 0); // 17.01.2024 12:00

export const dateFieldRenderTests = (
  name: string,
  DatePicker: React.FC<DatePickerProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class name', () => {
      it('renders with additional class name', () => {
        const component = TestRenderer.create(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
            className='some-class'
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};

// TODO: Add event tests
