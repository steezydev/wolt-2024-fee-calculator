import {
  autoCompleteDate,
  dateTimeStringToDate,
  isValidDate,
} from '@/helpers/date';
import { DateFieldProps } from '@/types/props/DateFieldProps';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const DateField = ({ date, onDateChange, renderInput }: DateFieldProps) => {
  const [inputValue, setInputValue] = useState(
    format(date, 'dd.MM.yyyy HH:mm')
  );

  useEffect(() => {
    setInputValue(format(date, 'dd.MM.yyyy HH:mm'));
  }, [date]);

  // Set or revert date value on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('DateField additional onBlur');
    const autoCompletedValue = autoCompleteDate(inputValue);

    if (isValidDate(autoCompletedValue)) {
      onDateChange && onDateChange(dateTimeStringToDate(autoCompletedValue));
    } else {
      setInputValue(format(date, 'dd.MM.yyyy HH:mm'));
    }
  };

  return renderInput({
    value: inputValue,
    onChange: (e) => setInputValue(e.target.value),
    onBlur: (e) => handleBlur(e),
  });
};

export default DateField;
