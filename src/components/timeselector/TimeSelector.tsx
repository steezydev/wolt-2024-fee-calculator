import { classNames } from '@/helpers/classNames';
import { TimeSelectorProps } from '@/types/props/TimeSelectorProps';
import React, { useEffect, useRef, useState } from 'react';

import ButtonUnstyled from '../button/ButtonUnstyled';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import B3 from '../typography/B3';

function createDateWithTime(hours: number, minutes: number) {
  let newDate = new Date();
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
}

const TimeSelector = ({
  time = new Date(),
  onTimeChange,
  className,
}: TimeSelectorProps) => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToTop(hourRef, time.getHours());
    scrollToTop(minuteRef, time.getMinutes());
  }, [time]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = (hour: number) => {
    onTimeChange && onTimeChange(createDateWithTime(hour, time.getMinutes()));
    scrollToTop(hourRef, hour);
  };

  const handleMinuteChange = (minute: number) => {
    onTimeChange && onTimeChange(createDateWithTime(time.getHours(), minute));
    scrollToTop(minuteRef, minute);
  };

  const scrollToTop = (ref: React.RefObject<HTMLDivElement>, value: number) => {
    const element = ref.current;
    if (element) {
      const child = element.children[value];
      const scrollPosition =
        (child as HTMLElement).offsetTop -
        ((child as HTMLElement).clientHeight + 60);
      element.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };

  const selectPreviousHour = () => {
    // if (selectedHour > 0) {
    //   handleHourChange(selectedHour - 1);
    // }
  };

  const selectNextHour = () => {
    // if (selectedHour < 23) {
    //   handleHourChange(selectedHour + 1);
    // }
  };

  const selectPreviousMinute = () => {
    // if (selectedMinute > 0) {
    //   handleMinuteChange(selectedMinute - 1);
    // }
  };

  const selectNextMinute = () => {
    // if (selectedMinute < 59) {
    //   handleMinuteChange(selectedMinute + 1);
    // }
  };

  return (
    <div className={classNames('flex gap-1', className)}>
      <div className='flex flex-col items-center gap-1 w-full'>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursPrevious'
          ariaLabel='Select previous hours value'
          onClick={selectPreviousHour}
        >
          <ChevronUpIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
        <div
          ref={hourRef}
          className='flex flex-col overflow-auto scrollbar-hide gap-0.5 w-full max-h-56'
        >
          {hours.map((hour) => (
            <ButtonUnstyled
              id={`selectHour${hour}Button`}
              ariaLabel={`Hour ${hour}`}
              type='button'
              key={hour}
              className={classNames(
                'px-3 py-1 rounded-lg hover:bg-primary-100 w-full text-black dark:text-white',
                hour === time.getHours() &&
                  'bg-primary-300 text-white hover:bg-primary-300'
              )}
              onClick={() => handleHourChange(hour)}
            >
              <B3>{hour.toString().padStart(2, '0')}</B3>
            </ButtonUnstyled>
          ))}
          <div className='py-20'></div>
        </div>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursNext'
          ariaLabel='Select next hours value'
          onClick={selectNextHour}
        >
          <ChevronDownIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
      </div>
      <div className='flex flex-col items-center gap-1 w-full'>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursPrevious'
          ariaLabel='Select previous minutes value'
          onClick={selectPreviousMinute}
        >
          <ChevronUpIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
        <div
          ref={minuteRef}
          className='flex flex-col overflow-auto scrollbar-hide gap-0.5 max-h-56 w-full'
        >
          {minutes.map((minute) => (
            <ButtonUnstyled
              id={`selectHour${minute}Button`}
              ariaLabel={`Minute ${minute}`}
              type='button'
              key={minute}
              className={classNames(
                'px-3 py-1 rounded-lg hover:bg-primary-100 w-full text-black dark:text-white',
                minute === time.getMinutes() &&
                  'bg-primary-300 text-white hover:bg-primary-300'
              )}
              onClick={() => handleMinuteChange(minute)}
            >
              <B3>{minute.toString().padStart(2, '0')}</B3>
            </ButtonUnstyled>
          ))}
          <div className='py-20'></div>
        </div>
        <ButtonUnstyled
          className='w-full flex items-center justify-center'
          id='timeHoursNext'
          ariaLabel='Select next minute value'
          onClick={selectNextMinute}
        >
          <ChevronDownIcon className='text-black dark:text-white' />
        </ButtonUnstyled>
      </div>
    </div>
  );
};

export default TimeSelector;
