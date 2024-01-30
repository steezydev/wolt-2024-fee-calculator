import CalculationResult from '@/components/calculationresult/CalculationResult';
import CalculationResultItem from '@/components/calculationresult/CalculationResultItem';
import DeliveryFeeForm from '@/components/deliveryfeeform/DeliveryFeeForm';
import BadgeInfoIcon from '@/components/icons/BadgeInfoIcon';
import ThemeSwitch from '@/components/themeswitch/ThemeSwitch';
import B2 from '@/components/typography/B2';
import H1 from '@/components/typography/H1';
import { calculateDeliveryFee } from '@/helpers/deliveryFee';
import { DeliveryFeeFormData } from '@/types/data/DeliveryFeeFormData';
import { format } from 'date-fns';
import { useState } from 'react';

const App = () => {
  const [deliveryData, setDeliveryData] = useState<DeliveryFeeFormData | null>(
    null
  );
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);

  const handleFormSubmit = (data: DeliveryFeeFormData) => {
    setDeliveryData(data);
    const fee = calculateDeliveryFee(
      data.cartValue,
      data.deliveryDistance,
      data.itemsAmount,
      data.orderTime
    );
    setDeliveryPrice(fee);
  };

  return (
    <>
      <header
        aria-labelledby='header'
        className='py-8 sm:py-12 flex flex-row items-start justify-between gap-5'
      >
        <H1 id='header' className='text-black dark:text-white'>
          Delivery fee calculator
        </H1>
        <ThemeSwitch />
      </header>
      <main aria-label='Main content' className='flex flex-col gap-6 mb-10'>
        <div className='flex flex-row gap-3 items-center'>
          <BadgeInfoIcon className='text-primary-300' />
          <B2
            id='orderFeeFormDescription'
            className='text-black dark:text-white'
          >
            Order fee calculation form
          </B2>
        </div>
        <DeliveryFeeForm
          ariaLabeledBy={'orderFeeFormDescription'}
          onSubmit={handleFormSubmit}
        />
        {deliveryPrice !== null && deliveryData && (
          <CalculationResult result={deliveryPrice}>
            <CalculationResultItem
              label='Cart value'
              value={`${deliveryData?.cartValue} €`}
            />
            <CalculationResultItem
              label='Delivery distance'
              value={`${deliveryData?.deliveryDistance} m`}
            />
            <CalculationResultItem
              label='Amount of items'
              value={deliveryData?.itemsAmount.toString()}
            />
            <CalculationResultItem
              label='Order time'
              value={format(deliveryData?.orderTime, 'dd.MM.yyyy HH:mm')}
            />
          </CalculationResult>
        )}
      </main>
    </>
  );
};

export default App;
