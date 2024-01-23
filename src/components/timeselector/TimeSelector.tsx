import { classNames } from '@/helpers/classNames';
import { TimeSelectorProps } from '@/types/props/TimeSelectorProps';
import React, { useEffect, useRef, useState } from 'react';

import ButtonUnstyled from '../button/ButtonUnstyled';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';

const TimeSelector = ({
  selectedDateTime = new Date(),
  onTimeChange,
  className,
}: TimeSelectorProps) => {
  const [selectedHour, setSelectedHour] = useState(selectedDateTime.getHours());
  const [selectedMinute, setSelectedMinute] = useState(
    selectedDateTime.getMinutes()
  );

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   scrollToTop(hourRef, selectedDateTime.getHours());
  //   scrollToTop(minuteRef, selectedDateTime.getMinutes());
  // }, []);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = (hour: number) => {
    setSelectedHour(hour);
    onTimeChange(hour, selectedMinute);
    scrollToTop(hourRef, hour);
  };

  const handleMinuteChange = (minute: number) => {
    setSelectedMinute(minute);
    onTimeChange(selectedHour, minute);
    scrollToTop(minuteRef, minute);
  };

  const scrollToTop = (ref: React.RefObject<HTMLDivElement>, value: number) => {
    const element = ref.current;
    if (element) {
      const child = element.children[value];
      const scrollPosition = child.offsetTop - (child.clientHeight + 60);
      element.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={classNames('flex gap-1', className)}>
      <div className='flex flex-col items-center gap-1'>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursPrevious'
          ariaLabel='Select previous hour'
        >
          <ChevronUpIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
        <div
          ref={hourRef}
          className='flex flex-col overflow-auto scrollbar-hide gap-0.5 max-h-44'
        >
          {hours.map((hour) => (
            <button
              type='button'
              key={hour}
              className={classNames(
                'px-3 py-1 rounded-lg hover:bg-primary-300/40',
                hour === selectedHour
                  ? 'bg-primary-300 text-white hover:bg-primary-300'
                  : ''
              )}
              onClick={() => handleHourChange(hour)}
            >
              {hour.toString().padStart(2, '0')}
            </button>
          ))}
          <div className='py-20'></div>
        </div>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursNext'
          ariaLabel='Select next hour'
        >
          <ChevronDownIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursPrevious'
          ariaLabel='Select previous hour'
        >
          <ChevronUpIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
        <div
          ref={minuteRef}
          className='flex flex-col overflow-auto scrollbar-hide gap-0.5 max-h-44'
        >
          {minutes.map((minute) => (
            <button
              type='button'
              key={minute}
              className={classNames(
                'px-3 py-1 rounded-lg hover:bg-primary-300/40',
                minute === selectedMinute
                  ? 'bg-primary-300 text-white hover:bg-primary-300'
                  : ''
              )}
              onClick={() => handleMinuteChange(minute)}
            >
              {minute.toString().padStart(2, '0')}
            </button>
          ))}
          <div className='py-20'></div>
        </div>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursNext'
          ariaLabel='Select next hour'
        >
          <ChevronDownIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
      </div>
    </div>
  );
};

export default TimeSelector;
