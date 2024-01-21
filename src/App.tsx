import ButtonPrimary from '@/components/button/ButtonPrimary';
import BadgeInfoIcon from '@/components/icons/BadgeInfoIcon';
import InputMid from '@/components/input/InputRegular';
import InputLabel from '@/components/inputlabel/InputLabel';
import B2 from '@/components/typography/B2';
import H1 from '@/components/typography/H1';
import { wihtInputIcon, withInputField } from '@/hoc/InputHoc';
import { useState } from 'react';

import CalculationResult from './components/calculationresult/CalculationResult';
import CalculationResultItem from './components/calculationresult/CalculationResultItem';
import EuroIcon from './components/icons/EuroIcon';
import MapPinIcon from './components/icons/MapPinIcon';
import ThemeSwitch from './components/themeswitch/ThemeSwitch';
import { calculateDeliveryFee } from './helpers/deliveryFee';
import { withThemeSelectorHoc } from './hoc/ThemeHoc';

const CartValueInput = withInputField(wihtInputIcon(InputMid, EuroIcon));
const DeliveryDistanceInput = withInputField(
  wihtInputIcon(InputMid, MapPinIcon)
);
const ItemsAmountInput = withInputField(InputMid);
const ThemeSwitchSelector = withThemeSelectorHoc(ThemeSwitch);

const App = () => {
  const [cartValue, setCartValue] = useState('');
  const [deliveryDistance, setDeliveryDistance] = useState('');
  const [itemsAmount, setItemsAmount] = useState('');
  const [orderTime, setOrderTime] = useState('');

  //TODO: Add validation
  const isButtonActive =
    cartValue && deliveryDistance && itemsAmount && orderTime;

  const handleFormSubmit = () => {
    console.log(
      parseFloat(cartValue),
      parseInt(deliveryDistance),
      parseInt(itemsAmount),
      new Date(orderTime)
    );

    const fee = calculateDeliveryFee(
      parseFloat(cartValue),
      parseInt(deliveryDistance),
      parseInt(itemsAmount),
      new Date(orderTime)
    );

    console.log(fee);
  };

  return (
    <>
      <header className='py-8 sm:py-12 flex flex-row items-start justify-between gap-5'>
        <H1 className='text-black dark:text-white'>Delivery fee calculator</H1>
        <ThemeSwitchSelector />
      </header>
      <main className='flex flex-col gap-6'>
        <div className='flex flex-row gap-3 items-center'>
          <BadgeInfoIcon className='text-primary-300' />
          <B2 className='text-black dark:text-white'>
            Fill the fields to calculate the delivery fee
          </B2>
        </div>
        <form className='flex flex-col gap-4 sm:gap-6'>
          <InputLabel
            label='Cart value, €'
            id='cart-value-input'
            errorMessage='Please enter a positive float number'
          >
            <CartValueInput
              required
              className='w-full'
              id='cart-value-input'
              name='cart-value-input'
              type='number'
              ariaLabel='Cart value in euros'
              placeholder='20'
              min={0}
              onChange={(e) => setCartValue(e.target.value)}
              value={cartValue}
            />
          </InputLabel>
          <InputLabel
            label='Delivery distance, m'
            id='delivery-distance-input'
            errorMessage='Please enter a positive integer number in meters'
          >
            <DeliveryDistanceInput
              required
              className='w-full'
              id='delivery-distance-input'
              name='delivery-distance-input'
              type='number'
              ariaLabel='Delivery distance in meters'
              placeholder='900'
              min={0}
              onChange={(e) => setDeliveryDistance(e.target.value)}
              value={deliveryDistance}
            />
          </InputLabel>
          <InputLabel
            label='Amount of items'
            id='items-amount-input'
            errorMessage='Please enter a positive integer number of items'
          >
            <ItemsAmountInput
              required
              className='w-full'
              id='items-amount-input'
              name='items-amount-input'
              type='number'
              ariaLabel='Amount of items in cart'
              placeholder='1'
              min={1}
              onChange={(e) => setItemsAmount(e.target.value)}
              value={itemsAmount}
            />
          </InputLabel>
          <InputLabel
            label='Order time'
            id='order-time-input'
            errorMessage='Please enter a valid date'
          >
            <InputMid
              required
              className='w-full'
              id='order-time-input'
              name='order-time-input'
              type='datetime-local'
              ariaLabel='Order time'
              placeholder='1'
              onChange={(e) => setOrderTime(e.target.value)}
              value={orderTime}
            />
          </InputLabel>
          <ButtonPrimary
            id='submit-calculate-delivery-price'
            ariaLabel='Calculate delivery price'
            disabled={!isButtonActive}
            className='mt-4 w-full'
            onClick={handleFormSubmit}
          >
            Calculate delivery price
          </ButtonPrimary>
        </form>
        <CalculationResult result={7}>
          <CalculationResultItem label='Cart value' value='20 €' />
          <CalculationResultItem label='Delivery distance' value='900 m' />
          <CalculationResultItem label='Amount of items' value='1' />
          <CalculationResultItem label='Order time' value='17.01.2024 14:38' />
        </CalculationResult>
      </main>
    </>
  );
};

export default App;
