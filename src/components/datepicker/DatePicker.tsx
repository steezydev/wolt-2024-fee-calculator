import ButtonSecondary from '@/components/button/ButtonSecondary';
import Calendar from '@/components/calendar/Calendar';
import DateField from '@/components/datefield/DateField';
import CalendarPlusIcon from '@/components/icons/CalendarPlusIcon';
import ModalRegular from '@/components/modal/ModalRegular';
import Tabs from '@/components/tabs/Tabs';
import TimeSelector from '@/components/timeselector/TimeSelector';
import B3 from '@/components/typography/B3';
import { classNames } from '@/helpers/classNames';
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

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
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
      <div className='flex items-stretch gap-2'>
        <DateField
          date={value}
          onDateChange={onChange}
          renderInput={additiveRenderInput}
        />
        <ButtonSecondary
          onClick={() => setIsPickerOpen(true)}
          disabled={isPickerOpen}
          className='aspect-square flex justify-center items-center text-primary-300 px-3.5'
          id='openDatePickerButton'
          ariaLabel='Open datepicker modal'
        >
          <CalendarPlusIcon className='w-6 h-6 text-inherit' />
        </ButtonSecondary>
      </div>
      <ModalRegular
        id='datePickerModal'
        title={'Date picker'}
        isOpen={isPickerOpen}
        onClose={() => {
          setIsPickerOpen(false);
          document.body.focus();
        }}
        className='top-16 h-[395px] w-full sm:w-80 p-2 '
      >
        <Tabs className='w-full'>
          <Tabs.Tab
            id='datePickerTabButton'
            ariaLabel='Open date picker tab'
            value='datePickerTabButton'
          >
            <B3>Date</B3>
          </Tabs.Tab>
          <Tabs.Panel
            value='datePickerTabButton'
            className='flex justify-center mt-3'
          >
            <Calendar selectedDate={value} onChange={onDateChange} />
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
      </ModalRegular>
    </div>
  );
};

export default DatePicker;
