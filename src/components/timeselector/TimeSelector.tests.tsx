import { TimeSelectorColumnProps } from '@/types/props/TimeSelectorColumnProps';
import { TimeSelectorItemProps } from '@/types/props/TimeSelectorItemProps';
import { TimeSelectorProps } from '@/types/props/TimeSelectorProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const mockOnTimeChange = jest.fn();
const mockOnItemClick = jest.fn();
const testDate = new Date(2024, 0, 17, 12, 35); // 17.01.2024 12:00

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

export const timeSelectorRenderTests = (
  name: string,
  TimeSelector: React.FC<TimeSelectorProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <TimeSelector time={testDate} onChange={mockOnTimeChange} />
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
            onChange={mockOnTimeChange}
            className='some-class'
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with test date 17.01.2024 12:00', () => {
      it('renders with selected time 12:00', () => {
        render(<TimeSelector time={testDate} onChange={mockOnTimeChange} />);

        expect(screen.getByLabelText('Select 12 hour')).toHaveAttribute(
          'aria-selected',
          'true'
        );
        expect(screen.getByLabelText('Select 35 minute')).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });
  });
};

export const timeSelectorEventTests = (
  name: string,
  TimeSelector: React.FC<TimeSelectorProps>
) => {
  describe(name, () => {
    describe('when hours "15" button is clicked', () => {
      it('onChange is called with 15 value', () => {
        render(<TimeSelector time={testDate} onChange={mockOnTimeChange} />);

        fireEvent.click(screen.getByLabelText('Select 15 hour'));

        expect(mockOnTimeChange).toHaveBeenCalled();
        expect(mockOnTimeChange).toHaveBeenCalledWith(15, null);
      });
    });

    describe('when minute "15" button is clicked', () => {
      it('onChange is called with "15" value', () => {
        render(<TimeSelector time={testDate} onChange={mockOnTimeChange} />);

        fireEvent.click(screen.getByLabelText('Select 15 minute'));

        expect(mockOnTimeChange).toHaveBeenCalled();
        expect(mockOnTimeChange).toHaveBeenCalledWith(null, 15);
      });
    });
  });
};

export const timeSelectorColumnRenderTests = (
  name: string,
  TimeSelectorColumn: React.FC<TimeSelectorColumnProps>
) => {
  describe(name, () => {
    describe('when asked to render with hours', () => {
      it('renders with hours', () => {
        const component = TestRenderer.create(
          <TimeSelectorColumn
            type='hour'
            items={hours}
            currentItem={testDate.getHours()}
            onChange={mockOnTimeChange}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with minutes', () => {
      it('renders with minutes', () => {
        const component = TestRenderer.create(
          <TimeSelectorColumn
            type='minute'
            items={minutes}
            currentItem={testDate.getMinutes()}
            onChange={mockOnTimeChange}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render hours with test date 17.01.2024 12:00', () => {
      it('renders with selected time hours 12', () => {
        render(
          <TimeSelectorColumn
            type='hour'
            items={hours}
            currentItem={testDate.getHours()}
            onChange={mockOnTimeChange}
          />
        );

        expect(screen.getByLabelText('Select 12 hour')).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });

    describe('when asked to render minutes with test date 17.01.2024 12:00', () => {
      it('renders with selected time minutes 12', () => {
        render(
          <TimeSelectorColumn
            type='minute'
            items={minutes}
            currentItem={testDate.getMinutes()}
            onChange={mockOnTimeChange}
          />
        );

        expect(screen.getByLabelText('Select 35 minute')).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });
  });
};

export const timeSelectorColumnEventTests = (
  name: string,
  TimeSelectorColumn: React.FC<TimeSelectorColumnProps>
) => {
  describe(name, () => {
    describe('when hours "15" button is clicked', () => {
      it('onChange is called with 15 value', () => {
        render(
          <TimeSelectorColumn
            type='hour'
            items={hours}
            currentItem={testDate.getHours()}
            onChange={mockOnTimeChange}
          />
        );

        fireEvent.click(screen.getByLabelText('Select 15 hour'));

        expect(mockOnTimeChange).toHaveBeenCalled();
        expect(mockOnTimeChange).toHaveBeenCalledWith(15);
      });
    });

    describe('when minute "20" button is clicked', () => {
      it('onChange is called with "20" value', () => {
        render(
          <TimeSelectorColumn
            type='minute'
            items={minutes}
            currentItem={testDate.getMinutes()}
            onChange={mockOnTimeChange}
          />
        );

        fireEvent.click(screen.getByLabelText('Select 20 minute'));

        expect(mockOnTimeChange).toHaveBeenCalled();
        expect(mockOnTimeChange).toHaveBeenCalledWith(20);
      });
    });
  });
};

export const timeSelectorItemRenderTests = (
  name: string,
  TimeSelectorItem: React.FC<TimeSelectorItemProps>
) => {
  describe(name, () => {
    describe('when asked to render type hour', () => {
      it('renders type hour', () => {
        const component = TestRenderer.create(
          <TimeSelectorItem value={15} type='hour' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render type minute', () => {
      it('renders type minute', () => {
        const component = TestRenderer.create(
          <TimeSelectorItem value={35} type='minute' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render type hour active', () => {
      it('renders type hour active', () => {
        const cp = <TimeSelectorItem value={15} type='hour' isActive={true} />;

        const component = TestRenderer.create(cp);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        render(cp);

        expect(screen.getByLabelText('Select 15 hour')).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });

    describe('when asked to render type minute active', () => {
      it('renders type minute active', () => {
        const cp = (
          <TimeSelectorItem value={35} type='minute' isActive={true} />
        );

        const component = TestRenderer.create(cp);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        render(cp);

        expect(screen.getByLabelText('Select 35 minute')).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });
  });
};

export const timeSelectorItemEventTests = (
  name: string,
  TimeSelectorItem: React.FC<TimeSelectorItemProps>
) => {
  describe(name, () => {
    describe('when hour button is clicked', () => {
      it('onClick is called', () => {
        render(
          <TimeSelectorItem value={15} type='hour' onClick={mockOnItemClick} />
        );

        fireEvent.click(screen.getByLabelText('Select 15 hour'));

        expect(mockOnItemClick).toHaveBeenCalled();
      });
    });

    describe('when minute button is clicked', () => {
      it('onClick is called', () => {
        render(
          <TimeSelectorItem
            value={15}
            type='minute'
            onClick={mockOnItemClick}
          />
        );

        fireEvent.click(screen.getByLabelText('Select 15 minute'));

        expect(mockOnItemClick).toHaveBeenCalled();
      });
    });
  });
};
