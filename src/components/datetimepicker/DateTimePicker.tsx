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

import { Panel, Tab, Tabs } from '../tabs/Tabs';
import TimeSelector from '../timeselector/TimeSelector';
import B3 from '../typography/B3';

//TODO: Refactor component

//TODO: Add tests

const DateTimePicker = ({
  Item,
  className,
  onChangeDate,
  onChangeTime,
  ...props
}: InputDateProps) => {
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
          className='absolute bg-white dark:bg-black border-2 rounded-xl border-primary-300 top-16 flex flex-row h-[360px] w-80 p-2'
          ref={ref}
        >
          <Tabs className='w-full'>
            <Tab
              id='datePickerTabButton'
              ariaLabel='Open date picker tab'
              value='datePickerTabButton'
            >
              <B3>Date</B3>
            </Tab>
            <Panel value='datePickerTabButton'>
              <Calendar
                weekStartsOn={1}
                showOutsideDays
                selectedDate={props.value}
                onDayClick={onChangeDate}
              />
            </Panel>

            <Tab
              id='timePickerTabButton'
              ariaLabel='Open time picker tab'
              value='timePickerTabButton'
            >
              <B3>Time</B3>
            </Tab>
            <Panel value='timePickerTabButton' className='p-2'>
              <TimeSelector
                className=''
                time={props.value}
                onTimeChange={onChangeTime}
              />
            </Panel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
