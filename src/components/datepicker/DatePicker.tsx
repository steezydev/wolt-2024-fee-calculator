import Calendar from '@/components/calendar/Calendar';
import DateField from '@/components/datefield/DateField';
import Tabs from '@/components/tabs/Tabs';
import TimeSelector from '@/components/timeselector/TimeSelector';
import B3 from '@/components/typography/B3';
import { classNames } from '@/helpers/classNames';
import useClickOutside from '@/hooks/useClickOutside';
import { DatePickerProps } from '@/types/props/DatePickerProps';
import { RenderInputProps } from '@/types/props/RenderInputProps';
import React, { useState } from 'react';

const DatePicker = ({
  value,
  renderInput,
  onDateChange,
  onTimeChange,
  onChange,
  className,
}: DatePickerProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => setIsPickerOpen(false));

  const handleBlur = () => {
    setIsFocused(false);
    if (!ref.current?.focus) {
      setIsPickerOpen(false);
    }
  };

  const handleFocus = () => {
    setIsPickerOpen(true);
    setIsFocused(true);
  };

  // Add onBlur and onFocus handlers to renderInput on top of existing ones
  const additiveRenderInput = (props: RenderInputProps) => {
    const onBlur = props.onBlur;
    const onFocus = props.onFocus;
    return renderInput({
      ...props,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        handleBlur();
        onBlur && onBlur(e);
      },
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        handleFocus();
        onFocus && onFocus(e);
      },
    });
  };

  return (
    <div
      data-invalid={false}
      data-focused={isFocused}
      className={classNames('w-full relative', className)}
    >
      <DateField
        date={value}
        onDateChange={onChange}
        renderInput={additiveRenderInput}
      />
      {isPickerOpen && (
        <div
          className='absolute bg-white dark:bg-black border-2 rounded-xl border-primary-300 top-16 flex flex-row h-[360px] w-80 p-2'
          ref={ref}
        >
          <Tabs className='w-full'>
            <Tabs.Tab
              id='datePickerTabButton'
              ariaLabel='Open date picker tab'
              value='datePickerTabButton'
            >
              <B3>Date</B3>
            </Tabs.Tab>
            <Tabs.Panel value='datePickerTabButton'>
              <Calendar
                weekStartsOn={1}
                showOutsideDays
                selectedDate={value}
                onChange={onDateChange}
              />
            </Tabs.Panel>
            <Tabs.Tab
              id='timePickerTabButton'
              ariaLabel='Open time picker tab'
              value='timePickerTabButton'
            >
              <B3>Time</B3>
            </Tabs.Tab>
            <Tabs.Panel value='timePickerTabButton' className='p-2'>
              <TimeSelector className='' time={value} onChange={onTimeChange} />
            </Tabs.Panel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
