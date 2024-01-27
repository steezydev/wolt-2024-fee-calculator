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
      it('renders', () => {
        const component = TestRenderer.create(<Calendar />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with week starting on Tuesday', () => {
      it('renders with week starting on Tuesday', () => {
        const component = TestRenderer.create(<Calendar weekStartsOn={2} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render without outside dates', () => {
      it('renders without outside dates', () => {
        const component = TestRenderer.create(
          <Calendar showOutsideDays={false} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with selected date', () => {
      it('renders with selected date', () => {
        const component = TestRenderer.create(
          <Calendar selectedDate={testDate} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <Calendar className='some-class' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with selected date', () => {
      it('selected date has active class', () => {
        render(<Calendar selectedDate={testDate} />);

        expect(screen.getByText('17', { selector: 'button' })).toHaveClass(
          'bg-primary-300 text-white'
        );
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

        const newDateButton = screen.getByText('20', { selector: 'button' });
        fireEvent.click(newDateButton);

        expect(mockOnDateChange).toHaveBeenCalledTimes(1);
      });
    });
  });
};
