import ButtonPrimary from '@/components/button/ButtonPrimary';
import CalculationResult from '@/components/calculationresult/CalculationResult';
import CalculationResultItem from '@/components/calculationresult/CalculationResultItem';
import DatePicker from '@/components/datepicker/DatePicker';
import BadgeInfoIcon from '@/components/icons/BadgeInfoIcon';
import CalendarClockIcon from '@/components/icons/CalendarClockIcon';
import EuroIcon from '@/components/icons/EuroIcon';
import MapPinIcon from '@/components/icons/MapPinIcon';
import InputRegular from '@/components/input/InputRegular';
import InputLabel from '@/components/inputlabel/InputLabel';
import ThemeSwitch from '@/components/themeswitch/ThemeSwitch';
import B2 from '@/components/typography/B2';
import H1 from '@/components/typography/H1';
import { calculateDeliveryFee } from '@/helpers/deliveryFee';
import { withInputIcon } from '@/hoc/InputHoc';
import useDatetimeSelector from '@/hooks/useDatetimeSelector';
import useInput from '@/hooks/useInput';
import { format } from 'date-fns';
import { useState } from 'react';

//TODO: Write comments for components (everything)

const CartValueInput = withInputIcon(InputRegular, EuroIcon);
const DeliveryDistanceInput = withInputIcon(InputRegular, MapPinIcon);
const ItemsAmountInput = InputRegular;
const OrderTimeInput = withInputIcon(InputRegular, CalendarClockIcon);

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

  const orderTime = useDatetimeSelector(new Date());

  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);

  const isButtonActive =
    cartValueInputData.isValid &&
    cartValueInputData.isFilled &&
    deliveryDistanceInputData.isValid &&
    deliveryDistanceInputData.isFilled &&
    itemsAmountInputData.isValid &&
    itemsAmountInputData.isFilled &&
    orderTime.value;

  const handleFormSubmit = () => {
    const cartValue = parseFloat(cartValueInputData.value);
    const deliveryDistance = parseInt(deliveryDistanceInputData.value);
    const itemsAmount = parseInt(itemsAmountInputData.value);
    const orderDatetime = new Date(orderTime.value);

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
        <ThemeSwitch />
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
              id='cartValue'
              name='cartValueInput'
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
              id='deliveryDistance'
              name='deliveryDistanceInput'
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
              id='numberOfItems'
              name='deliveryItemsAmountInput'
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
                  placeholder='hh.mm.yyyy HH:MM'
                />
              )}
              onDatetimeChange={orderTime.handleChangeDatetime}
              onDateChange={orderTime.handleChangeDate}
              onTimeChange={orderTime.handleChangeTime}
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
              value={format(orderTime.value, 'dd.MM.yyyy HH:mm')}
            />
          </CalculationResult>
        )}
      </main>
    </>
  );
};

export default App;
