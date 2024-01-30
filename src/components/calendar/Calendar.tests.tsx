import { CalendarProps } from '@/types/props/CalendarProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const testDate = new Date(2024, 0, 17, 12, 35); // 17.01.2024 12:00
const mockOnDateChange = jest.fn();

export const calendarRenderTests = (
  name: string,
  Calendar: React.FC<CalendarProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(<Calendar />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(<Calendar />);

        expect(screen.getByText('January 2024')).toBeInTheDocument();

        expect(
          screen.getByLabelText('Choose Monday, 1 January 2024')
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText('Choose Wednesday, 17 January 2024')
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText('Choose Wednesday, 31 January 2024')
        ).toBeInTheDocument();
      });
    });

    describe('when asked to render with selected date', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Calendar selectedDate={testDate} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with date selected', () => {
        render(<Calendar selectedDate={testDate} />);

        expect(
          screen.getByLabelText('Choose Wednesday, 17 January 2024')
        ).toHaveAttribute('aria-selected', 'true');
      });
    });
  });
};

export const calendarEventTests = (
  name: string,
  Calendar: React.FC<CalendarProps>
) => {
  describe(name, () => {
    describe('when date button is clicked', () => {
      it('onChange is called', () => {
        render(
          <Calendar onChange={mockOnDateChange} selectedDate={testDate} />
        );

        const newDateButton = screen.getByLabelText(
          'Choose Wednesday, 17 January 2024'
        );

        fireEvent.click(newDateButton);

        expect(mockOnDateChange).toHaveBeenCalledTimes(1);
      });
    });
  });
};
