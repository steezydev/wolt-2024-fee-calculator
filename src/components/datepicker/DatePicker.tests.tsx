import { DatePickerProps } from '@/types/props/DatePickerProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

    describe('when asked to render with initial value', () => {
      it('renders with intial value in the input', () => {
        render(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        expect(
          screen.getByDisplayValue('17.01.2024 12:00')
        ).toBeInTheDocument();
      });
    });
  });
};

export const dateFieldEventTests = (
  name: string,
  DatePicker: React.FC<DatePickerProps>
) => {
  describe(name, () => {
    describe('when "open datepicker modal" button is clicked', () => {
      it('datepicker modal is opened and button is disabled', async () => {
        render(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const openModalButton = screen.getByLabelText('Open datepicker modal');

        // Open modal
        expect(openModalButton).not.toBeDisabled();
        fireEvent.click(openModalButton);

        expect(openModalButton).toBeDisabled();

        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
      });
    });

    describe('when outside the datepicker modal', () => {
      it('datepicker modal is closed', async () => {
        render(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const openModalButton = screen.getByLabelText('Open datepicker modal');

        // Open modal
        expect(openModalButton).not.toBeDisabled();
        fireEvent.click(openModalButton);

        const modal = screen.getByRole('dialog');

        // Close modal
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        fireEvent.mouseDown(outsideElement);

        expect(modal).not.toBeInTheDocument();

        document.body.removeChild(outsideElement);
      });
    });

    describe('when input value is changed', () => {
      it('onChange is called', () => {
        render(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const input = screen.getByRole<HTMLInputElement>('textbox');

        fireEvent.change(input, { target: { value: '14.01.2024 13:00' } });
        fireEvent.blur(input);

        expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
      });
    });

    describe('when calendar day is clicked', () => {
      it('onDateChange is called', () => {
        render(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const openModalButton = screen.getByLabelText('Open datepicker modal');
        fireEvent.click(openModalButton);

        const day = screen.getByLabelText('Choose Sunday, 14 January 2024');
        expect(day).toBeInTheDocument();

        fireEvent.click(day);

        expect(mockOnDateChange).toHaveBeenCalledWith(expect.any(Date));
      });
    });

    describe('when time selector time is clicked', () => {
      it('onTimeChange is called', () => {
        render(
          <DatePicker
            value={testDate}
            onDateChange={mockOnDateChange}
            onTimeChange={mockOnTimeChange}
            onChange={mockOnChange}
            renderInput={(inputProps) => <input {...inputProps} />}
          />
        );

        const openModalButton = screen.getByLabelText('Open datepicker modal');
        fireEvent.click(openModalButton);

        const tab2Button = screen.getByLabelText('Open time picker tab');
        fireEvent.click(tab2Button);

        const hourButton = screen.getByLabelText('Select 14 hour');
        expect(hourButton).toBeInTheDocument();
        fireEvent.click(hourButton);

        expect(mockOnTimeChange).toHaveBeenCalledWith(14, null);

        const minuteButton = screen.getByLabelText('Select 30 minute');
        expect(minuteButton).toBeInTheDocument();
        fireEvent.click(minuteButton);

        expect(mockOnTimeChange).toHaveBeenCalledWith(null, 30);
      });
    });
  });
};
