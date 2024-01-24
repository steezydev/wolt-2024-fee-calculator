import ButtonUnstyled from '@/components/button/ButtonUnstyled';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon';
import TimeSelectorItem from '@/components/timeselector/TimeSelectorItem';
import { TimeSelectorColumnProps } from '@/types/props/TimeSelectorColumnProps';
import React from 'react';

const TimeSelectorColumn = React.forwardRef<
  HTMLDivElement,
  TimeSelectorColumnProps
>(({ type, items, currentItem, onChange }, ref) => {
  return (
    <div className='flex flex-col items-center gap-1 w-full'>
      <ButtonUnstyled
        id={`selectPrevious${type}Button`}
        className='w-full flex items-center justify-center'
        ariaLabel={`Select previous ${type}`}
        onClick={() => onChange(Math.max(currentItem - 1, 0))}
      >
        <ChevronUpIcon className='text-black dark:text-white' />
      </ButtonUnstyled>
      <div
        ref={ref}
        className='flex flex-col overflow-auto scrollbar-hide gap-0.5 w-full max-h-56'
      >
        {items.map((item) => (
          <TimeSelectorItem
            key={item}
            value={item}
            isActive={item === currentItem}
            type={type}
            onClick={() => onChange(item)}
          />
        ))}
        <div className='py-20'></div>
      </div>
      <ButtonUnstyled
        id={`selectNext${type}Button`}
        className='w-full flex items-center justify-center'
        ariaLabel={`Select next ${type}`}
        onClick={() => onChange(Math.min(currentItem + 1, items.length - 1))}
      >
        <ChevronDownIcon className='text-black dark:text-white' />
      </ButtonUnstyled>
    </div>
  );
});

export default TimeSelectorColumn;
