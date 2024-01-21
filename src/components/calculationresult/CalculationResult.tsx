import B1 from '@/components/typography/B1';
import { classNames } from '@/helpers/classNames';
import { formatCurrency } from '@/helpers/currency';
import { CalculationResultProps } from '@/types/props/CalculationResultProps';

const CalculationResult = ({
  result,
  currency = 'EUR',
  children,
  className,
}: CalculationResultProps) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-6 bg-primary-100 py-6 px-5 rounded-xl text-black dark:text-white',
        className
      )}
    >
      <div className='flex flex-col gap-1'>{children}</div>
      <div className='flex flex-row justify-between'>
        <B1 className='text-2xl font-semibold'>Delivery fee</B1>
        <B1 className='text-2xl  font-semibold'>
          {formatCurrency(result, currency)}
        </B1>
      </div>
    </div>
  );
};

export default CalculationResult;
