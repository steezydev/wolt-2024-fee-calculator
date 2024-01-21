import B3 from '@/components/typography/B3';
import { classNames } from '@/helpers/classNames';
import { CalculationResultItemProps } from '@/types/props/CalculationResultItemProps';

const CalculationResultItem = ({
  label,
  value,
  className,
}: CalculationResultItemProps) => {
  return (
    <div className={classNames('flex flex-row justify-between', className)}>
      <B3>{label}</B3>
      <B3>{value}</B3>
    </div>
  );
};

export default CalculationResultItem;
