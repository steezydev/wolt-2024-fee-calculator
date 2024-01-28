import ButtonPrimary from '@/components/button/ButtonPrimary';
import DatePicker from '@/components/datepicker/DatePicker';
import CalendarClockIcon from '@/components/icons/CalendarClockIcon';
import EuroIcon from '@/components/icons/EuroIcon';
import MapPinIcon from '@/components/icons/MapPinIcon';
import InputRegular from '@/components/input/InputRegular';
import InputLabel from '@/components/inputlabel/InputLabel';
import { classNames } from '@/helpers/classNames';
import { withInputIcon } from '@/hoc/InputHoc';
import useDatetimeSelector from '@/hooks/useDatetimeSelector';
import useInput from '@/hooks/useInput';
import { DeliveryFeeFormProps } from '@/types/props/DeliveryFeeFormProps';
import React from 'react';

const CartValueInput = withInputIcon(InputRegular, EuroIcon);
const DeliveryDistanceInput = withInputIcon(InputRegular, MapPinIcon);
const ItemsAmountInput = InputRegular;
const OrderTimeInput = withInputIcon(InputRegular, CalendarClockIcon);

const DeliveryFeeForm = ({
  onSubmit,
  ariaLabeledBy,
  className,
}: DeliveryFeeFormProps) => {
  const cartValueInputData = useInput('', {
    required: true,
    type: 'numeric',
  });

  const deliveryDistanceInputData = useInput('', {
    required: true,
    type: 'integer',
  });

  const itemsAmountInputData = useInput('', {
    required: true,
    type: 'integer',
  });

  const orderTime = useDatetimeSelector(new Date());

  const isButtonActive =
    cartValueInputData.isValid &&
    cartValueInputData.isFilled &&
    deliveryDistanceInputData.isValid &&
    deliveryDistanceInputData.isFilled &&
    itemsAmountInputData.isValid &&
    itemsAmountInputData.isFilled &&
    orderTime.value;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      cartValue: parseFloat(cartValueInputData.value),
      deliveryDistance: parseInt(deliveryDistanceInputData.value),
      itemsAmount: parseInt(itemsAmountInputData.value),
      orderTime: orderTime.value,
    });
  };

  return (
    <form
      aria-labelledby={ariaLabeledBy}
      className={classNames('flex flex-col gap-4 sm:gap-6', className)}
      onSubmit={handleSubmit}
    >
      <InputLabel
        label='Cart value, €'
        id='cartValue'
        errorMessage={cartValueInputData.error}
        isInvalid={!cartValueInputData.isValid}
      >
        <CartValueInput
          required
          className='w-full'
          id='cartValue'
          name='cartValueInput'
          ariaLabel='Cart value in euros'
          placeholder='Cart value in euros...'
          min={1}
          onBlur={cartValueInputData.handleTouch}
          isInvalid={!cartValueInputData.isValid}
          onChange={cartValueInputData.handleChange}
          value={cartValueInputData.value}
        />
      </InputLabel>
      <InputLabel
        label='Delivery distance, m'
        id='deliveryDistance'
        errorMessage={deliveryDistanceInputData.error}
        isInvalid={!deliveryDistanceInputData.isValid}
      >
        <DeliveryDistanceInput
          required
          className='w-full'
          id='deliveryDistance'
          name='deliveryDistanceInput'
          ariaLabel='Delivery distance in meters'
          placeholder='Delivery distance in meters...'
          min={0}
          onBlur={deliveryDistanceInputData.handleTouch}
          isInvalid={!deliveryDistanceInputData.isValid}
          onChange={deliveryDistanceInputData.handleChange}
          value={deliveryDistanceInputData.value}
        />
      </InputLabel>
      <InputLabel
        label='Amount of items'
        id='numberOfItems'
        errorMessage={itemsAmountInputData.error}
        isInvalid={!itemsAmountInputData.isValid}
      >
        <ItemsAmountInput
          required
          className='w-full'
          id='numberOfItems'
          name='deliveryItemsAmountInput'
          ariaLabel='Amount of items in cart'
          placeholder='Number of items...'
          min={1}
          onBlur={itemsAmountInputData.handleTouch}
          isInvalid={!itemsAmountInputData.isValid}
          onChange={itemsAmountInputData.handleChange}
          value={itemsAmountInputData.value}
        />
      </InputLabel>
      <InputLabel
        label='Order time'
        id='orderTime'
        errorMessage='Please enter a valid date'
        isInvalid={false}
      >
        <DatePicker
          value={orderTime.value}
          renderInput={(inputProps) => (
            <OrderTimeInput
              {...inputProps}
              required
              className='w-full'
              id='orderTime'
              name='deliveryOrderDateTimeInput'
              ariaLabel='Order time'
              placeholder='Date and time... (hh.mm.yyyy HH:MM)'
            />
          )}
          onChange={orderTime.handleChange}
          onDateChange={orderTime.handleChangeDate}
          onTimeChange={orderTime.handleChangeTime}
        />
      </InputLabel>
      <ButtonPrimary
        id='submitCalculateDeliveryPrice'
        ariaLabel='Calculate delivery price'
        disabled={!isButtonActive}
        className='mt-4 w-full'
        type='submit'
      >
        Calculate delivery price
      </ButtonPrimary>
    </form>
  );
};

export default DeliveryFeeForm;
