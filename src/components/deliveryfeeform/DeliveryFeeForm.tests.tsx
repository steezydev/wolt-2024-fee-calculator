import { DeliveryFeeFormProps } from '@/types/props/DeliveryFeeFormProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const mockOnSubmit = jest.fn();

export const deliveryFeeFormRenderTests = (
  name: string,
  DeliveryFeeForm: React.FC<DeliveryFeeFormProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders correctly', () => {
        const cp = (
          <DeliveryFeeForm onSubmit={mockOnSubmit} ariaLabeledBy='some-id' />
        );

        const component = TestRenderer.create(cp);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        render(cp);

        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(
          screen.getByLabelText('Cart value in euros')
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText('Delivery distance in meters')
        ).toBeInTheDocument();
        expect(
          screen.getByLabelText('Amount of items in cart')
        ).toBeInTheDocument();
        expect(screen.getByLabelText('Order time')).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Calculate delivery price' })
        ).toBeDisabled();
      });
    });

    describe('when asked to render wtih additional class name', () => {
      it('renders wtih additional class name', () => {
        const component = TestRenderer.create(
          <DeliveryFeeForm
            className='some-class'
            ariaLabeledBy='some-id'
            onSubmit={mockOnSubmit}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};

export const deliveryFeeFormEventTests = (
  name: string,
  DeliveryFeeForm: React.FC<DeliveryFeeFormProps>
) => {
  const setup = () => {
    const utils = render(
      <DeliveryFeeForm onSubmit={mockOnSubmit} ariaLabeledBy='some-id' />
    );

    const cartValueInput = screen.getByLabelText<HTMLInputElement>(
      'Cart value in euros'
    );
    const deliveryDistanceInput = screen.getByLabelText<HTMLInputElement>(
      'Delivery distance in meters'
    );
    const itemsAmountInput = screen.getByLabelText<HTMLInputElement>(
      'Amount of items in cart'
    );
    const orderTimeInput =
      screen.getByLabelText<HTMLInputElement>('Order time');

    const submitButton = screen.getByRole<HTMLButtonElement>('button', {
      name: 'Calculate delivery price',
    });

    return {
      cartValueInput,
      deliveryDistanceInput,
      itemsAmountInput,
      orderTimeInput,
      submitButton,
      ...utils,
    };
  };

  describe(name, () => {
    describe('when form is filled', () => {
      it('submit button is active and calls onSubmit on click', () => {
        const {
          submitButton,
          cartValueInput,
          deliveryDistanceInput,
          itemsAmountInput,
          orderTimeInput,
        } = setup();

        expect(submitButton).toBeDisabled();

        fireEvent.change(cartValueInput, { target: { value: '20' } });
        fireEvent.change(deliveryDistanceInput, { target: { value: '900' } });
        fireEvent.change(itemsAmountInput, { target: { value: '5' } });
        fireEvent.change(orderTimeInput, {
          target: { value: '20.01.2024 20:20' },
        });

        expect(cartValueInput).toBeValid();
        expect(deliveryDistanceInput).toBeValid();
        expect(itemsAmountInput).toBeValid();

        expect(submitButton).toBeEnabled();
        submitButton.click();

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    describe('when form is filled incorectly', () => {
      it('inputs are invalid and submit button is disabled', () => {
        const {
          submitButton,
          cartValueInput,
          deliveryDistanceInput,
          itemsAmountInput,
          orderTimeInput,
        } = setup();

        expect(submitButton).toBeDisabled();

        fireEvent.change(cartValueInput, { target: { value: 'invalid' } });
        fireEvent.change(deliveryDistanceInput, {
          target: { value: 'invalid' },
        });
        fireEvent.change(itemsAmountInput, { target: { value: 'invalid' } });
        fireEvent.change(orderTimeInput, {
          target: { value: 'invalid' },
        });

        expect(cartValueInput).toBeInvalid();
        expect(deliveryDistanceInput).toBeInvalid();
        expect(itemsAmountInput).toBeInvalid();

        expect(submitButton).toBeDisabled();
      });
    });

    describe('when form inputs are touched', () => {
      it('error is shown', () => {
        const { submitButton, cartValueInput } = setup();

        expect(submitButton).toBeDisabled();

        fireEvent.blur(cartValueInput);

        expect(cartValueInput).toBeInvalid();

        expect(screen.getByText('This field is required')).toBeInTheDocument();

        expect(submitButton).toBeDisabled();
      });
    });
  });
};
