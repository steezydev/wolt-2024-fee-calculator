import BadgeInfoIcon from '@/components/icons/BadgeInfoIcon';
import InputMid from '@/components/input/InputRegular';
import InputLabel from '@/components/inputlabel/InputLabel';
import B2 from '@/components/typography/B2';
import H1 from '@/components/typography/H1';
import { useState } from 'react';

import ButtonPrimary from './components/button/ButtonPrimary';

const App = () => {
  const [cartValue, setCartValue] = useState('');

  return (
    <>
      <header className='pt-16 pb-20'>
        <H1>Delivery fee calculator</H1>
      </header>
      <main className='flex flex-col gap-6'>
        <div className='flex flex-row gap-3 items-center'>
          <BadgeInfoIcon className='text-primary-300' />
          <B2>Fill the fields to calculate the delivery fee</B2>
        </div>
        <form className='flex flex-col gap-6'>
          <InputLabel label='Cart value' id='cart-value-input'>
            <InputMid
              required
              className='w-full'
              id='cart-value-input'
              name='cart-value-input'
              type='number'
              ariaLabel='Cart value'
              placeholder='20'
              min={0}
              onChange={setCartValue}
              value={cartValue}
            />
          </InputLabel>
          <InputLabel label='Delivery distance' id='delivery-distance-input'>
            <InputMid
              required
              className='w-full'
              id='delivery-distance-input'
              name='delivery-distance-input'
              type='number'
              ariaLabel='Delivery distance'
              placeholder='900 m'
              min={0}
              onChange={setCartValue}
              value={cartValue}
            />
          </InputLabel>
          <InputLabel label='Amount of items' id='items-amount-input'>
            <InputMid
              required
              className='w-full'
              id='items-amount-input'
              name='items-amount-input'
              type='number'
              ariaLabel='Amount of items'
              placeholder='1'
              min={1}
              onChange={setCartValue}
              value={cartValue}
            />
          </InputLabel>
          <InputLabel label='Order time' id='order-time-input'>
            <InputMid
              required
              className='w-full'
              id='order-time-input'
              name='order-time-input'
              type='datetime-local'
              ariaLabel='Order time'
              placeholder='1'
              onChange={setCartValue}
              value={cartValue}
            />
          </InputLabel>
          <ButtonPrimary>Calculate delivery price</ButtonPrimary>
        </form>
      </main>
    </>
  );
};

export default App;
