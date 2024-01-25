import { TimeSelectorProps } from '@/types/props/TimeSelectorProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const mockOnTimeChange = jest.fn();
const testDate = new Date(2024, 0, 17, 12, 35); // 17.01.2024 12:00

export const timeSelectorRenderTests = (
  name: string,
  TimeSelector: React.FC<TimeSelectorProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <TimeSelector time={testDate} onTimeChange={mockOnTimeChange} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <TimeSelector
            time={testDate}
            onTimeChange={mockOnTimeChange}
            className='some-class'
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with test date 17.01.2024 12:00', () => {
      it('renders with selected time 12:00', () => {
        render(
          <TimeSelector time={testDate} onTimeChange={mockOnTimeChange} />
        );

        expect(screen.getByLabelText('Hour 12')).toHaveClass('bg-primary-300');
        expect(screen.getByLabelText('Minute 35')).toHaveClass(
          'bg-primary-300'
        );
      });
    });
  });
};

export const timeSelectorEventTests = (
  name: string,
  TimeSelector: React.FC<TimeSelectorProps>
) => {
  // TODO: Fix component first and then add tests
  describe(name, () => {
    describe('when hour 15 button is clicked', () => {
      it('onTimeChange is called', () => {
        render(
          <TimeSelector time={testDate} onTimeChange={mockOnTimeChange} />
        );

        fireEvent.click(screen.getByLabelText('Hour 15'));

        expect(mockOnTimeChange).toHaveBeenCalledTimes(1);
        // expect(mockOnTimeChange).toHaveBeenCalledWith(
        //   new Date(2024, 0, 17, 15, 35)
        // );
      });
    });
  });
};
