import ButtonPrimary from '@/components/button/ButtonPrimary';
import BadgeInfoIcon from '@/components/icons/BadgeInfoIcon';
import InputRegular from '@/components/input/InputRegular';
import InputLabel from '@/components/inputlabel/InputLabel';
import B2 from '@/components/typography/B2';
import H1 from '@/components/typography/H1';
import { wihtInputIcon } from '@/hoc/InputHoc';
import { format } from 'date-fns';
import { useState } from 'react';

import CalculationResult from './components/calculationresult/CalculationResult';
import CalculationResultItem from './components/calculationresult/CalculationResultItem';
import DateTimePicker from './components/datetimepicker/DateTimePicker';
import CalendarClockIcon from './components/icons/CalendarClockIcon';
import EuroIcon from './components/icons/EuroIcon';
import MapPinIcon from './components/icons/MapPinIcon';
import ThemeSwitch from './components/themeswitch/ThemeSwitch';
import { calculateDeliveryFee } from './helpers/deliveryFee';
import { withThemeSelectorHoc } from './hoc/ThemeHoc';
import useInput from './hooks/useInput';

//TODO: Write comments for components (everything)

const CartValueInput = wihtInputIcon(InputRegular, EuroIcon);
const DeliveryDistanceInput = wihtInputIcon(InputRegular, MapPinIcon);
const ItemsAmountInput = InputRegular;
const OrderTimeInput = wihtInputIcon(InputRegular, CalendarClockIcon);
const ThemeSwitchSelector = withThemeSelectorHoc(ThemeSwitch);

const App = () => {
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

  const [orderTime, setOrderTime] = useState(new Date());
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);

  const isButtonActive =
    cartValueInputData.isValid &&
    cartValueInputData.isFilled &&
    deliveryDistanceInputData.isValid &&
    deliveryDistanceInputData.isFilled &&
    itemsAmountInputData.isValid &&
    itemsAmountInputData.isFilled &&
    orderTime;

  const handleFormSubmit = () => {
    const cartValue = parseFloat(cartValueInputData.value);
    const deliveryDistance = parseInt(deliveryDistanceInputData.value);
    const itemsAmount = parseInt(itemsAmountInputData.value);
    const orderDatetime = new Date(orderTime);

    console.log(cartValue, deliveryDistance, itemsAmount, orderDatetime);
    const fee = calculateDeliveryFee(
      cartValue,
      deliveryDistance,
      itemsAmount,
      orderDatetime
    );
    setDeliveryPrice(fee);
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
            id='cartValueInput'
            errorMessage={cartValueInputData.error}
          >
            <CartValueInput
              required
              className='w-full'
              id='cartValueInput'
              name='cartValueInput'
              type='text'
              ariaLabel='Cart value in euros'
              placeholder='20'
              min={1}
              onBlur={cartValueInputData.handleTouch}
              isInvalid={!cartValueInputData.isValid}
              onChange={cartValueInputData.handleChange}
              value={cartValueInputData.value}
            />
          </InputLabel>
          <InputLabel
            label='Delivery distance, m'
            id='deliveryDistanceInput'
            errorMessage={deliveryDistanceInputData.error}
          >
            <DeliveryDistanceInput
              required
              className='w-full'
              id='deliveryDistanceInput'
              name='deliveryDistanceInput'
              type='text'
              ariaLabel='Delivery distance in meters'
              placeholder='900'
              min={0}
              onBlur={deliveryDistanceInputData.handleTouch}
              isInvalid={!deliveryDistanceInputData.isValid}
              onChange={deliveryDistanceInputData.handleChange}
              value={deliveryDistanceInputData.value}
            />
          </InputLabel>
          <InputLabel
            label='Amount of items'
            id='deliveryItemsAmountInput'
            errorMessage={itemsAmountInputData.error}
          >
            <ItemsAmountInput
              required
              className='w-full'
              id='deliveryItemsAmountInput'
              name='deliveryItemsAmountInput'
              type='text'
              ariaLabel='Amount of items in cart'
              placeholder='1'
              min={1}
              onBlur={itemsAmountInputData.handleTouch}
              isInvalid={!itemsAmountInputData.isValid}
              onChange={itemsAmountInputData.handleChange}
              value={itemsAmountInputData.value}
            />
          </InputLabel>
          <InputLabel
            label='Order time'
            id='deliveryOrderDateTimeInput'
            errorMessage='Please enter a valid date'
          >
            <DateTimePicker
              Item={OrderTimeInput}
              required
              className='w-full'
              id='deliveryOrderDateTimeInput'
              name='deliveryOrderDateTimeInput'
              ariaLabel='Order time'
              placeholder='hh.mm.yyyy HH:MM'
              onChange={setOrderTime}
              value={orderTime}
            />
          </InputLabel>
          <ButtonPrimary
            id='submitCalculateDeliveryPrice'
            ariaLabel='Calculate delivery price'
            disabled={!isButtonActive}
            className='mt-4 w-full'
            onClick={handleFormSubmit}
          >
            Calculate delivery price
          </ButtonPrimary>
        </form>
        {deliveryPrice !== null && (
          <CalculationResult result={deliveryPrice}>
            <CalculationResultItem
              label='Cart value'
              value={`${cartValueInputData.value} €`}
            />
            <CalculationResultItem
              label='Delivery distance'
              value={`${deliveryDistanceInputData.value} m`}
            />
            <CalculationResultItem
              label='Amount of items'
              value={itemsAmountInputData.value}
            />
            <CalculationResultItem
              label='Order time'
              value={format(orderTime, 'dd.MM.yyyy HH:mm')}
            />
          </CalculationResult>
        )}
      </main>
    </>
  );
};

export default App;
