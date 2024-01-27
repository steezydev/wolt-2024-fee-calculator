import { classNames } from '@/helpers/classNames';
import { setDateDate } from '@/helpers/date';
import { CalendarProps } from '@/types/props/CalendarProps';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calendar = ({
  selectedDate,
  onChange,
  weekStartsOn = 1,
  showOutsideDays = true,
  className,
}: CalendarProps) => {
  const handleDayClick = (date: Date) => {
    onChange?.(setDateDate(selectedDate ?? new Date(), date));
  };

  return (
    <DayPicker
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays}
      mode='single'
      selected={selectedDate}
      onDayClick={handleDayClick}
      className={classNames('w-fit text-black dark:text-white', className)}
      modifiersClassNames={{
        selected: 'bg-primary-300 text-white',
        today: 'my-today',
      }}
    />
  );
};

export default Calendar;
