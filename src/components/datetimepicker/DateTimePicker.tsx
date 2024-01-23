import Calendar from '@/components/calendar/Calendar';
import { classNames } from '@/helpers/classNames';
import {
  autoCompleteDate,
  dateTimeStringToDate,
  isValidDate,
} from '@/helpers/date';
import useClickOutside from '@/hooks/useClickOutside';
import { InputDateProps } from '@/types/props/InputDateProps';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import TimeSelector from '../timeselector/TimeSelector';
import B2 from '../typography/B2';

//TODO: Refactor component

//TODO: Additional functionality

//TODO: Add tests

//TODO: Add time picker

const DateTimePicker = ({ Item, className, ...props }: InputDateProps) => {
  const [textValue, setTextValue] = useState('');
  const [lastValidValue, setLastValidValue] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => setIsPickerOpen(false));

  //TODO: Refactor #1
  useEffect(() => {
    if (props.value) {
      setTextValue(format(props.value, 'dd.MM.yyyy HH:mm'));
    }
  }, [props.value]);

  const saveValue = (value: string, revertValue = false) => {
    setTextValue(value);

    if (isValidDate(value)) {
      setLastValidValue(value);
      props.onChange && props.onChange(dateTimeStringToDate(value));
    } else if (revertValue) {
      setTextValue(lastValidValue);

      props.onChange && props.onChange(dateTimeStringToDate(lastValidValue));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    saveValue(newValue);
  };

  //TODO: Refactor #2
  const handleDayClick = (day: Date) => {
    const timePart = textValue.split(' ')[1] || '00:00'; // Preserve existing time or use default
    const newDateValue = `${day.getDate().toString().padStart(2, '0')}.${(day.getMonth() + 1).toString().padStart(2, '0')}.${day.getFullYear()} ${timePart}`;
    saveValue(newDateValue);
  };

  const handleTimePick = (hour: number, minute: number) => {
    const datePart = textValue.split(' ')[0] || '01.01.1970'; // Preserve existing date or use default
    const newTimeValue = `${datePart} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    saveValue(newTimeValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!ref.current?.focus) {
      setIsPickerOpen(false);
    }
    if (!isValidDate(textValue)) {
      const autoCompletedValue = autoCompleteDate(textValue);
      saveValue(autoCompletedValue, true);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onFocus && props.onFocus(event);
    setIsPickerOpen(true);
    setIsFocused(true);
  };

  //TODO: Handle valid state
  return (
    <div
      data-invalid={false}
      data-focused={isFocused}
      className={classNames('w-full relative', className)}
    >
      <Item
        {...props}
        type='text'
        className='w-full'
        value={textValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isPickerOpen && (
        <div
          className='w-fit absolute bg-white dark:bg-black border-2 rounded-xl border-primary-300 top-16 flex flex-row h-80'
          ref={ref}
        >
          <Calendar
            weekStartsOn={1}
            showOutsideDays
            selectedDate={props.value}
            onDayClick={handleDayClick}
          />
          <div className='h-full border border-primary-300'></div>
          <div className='py-5 px-4 h-full flex flex-col gap-3'>
            <B2 className='font-bold'>Time</B2>
            <TimeSelector
              className='grow-0 max-h-full'
              selectedDateTime={props.value}
              onTimeChange={handleTimePick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
