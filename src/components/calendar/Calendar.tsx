import { classNames } from '@/helpers/classNames';
import { CalendarProps } from '@/types/props/CalendarProps';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calendar = ({
  selectedDate,
  onDayClick,
  weekStartsOn = 1,
  showOutsideDays = true,
  className,
}: CalendarProps) => {
  return (
    <DayPicker
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays}
      mode='single'
      selected={selectedDate}
      onDayClick={onDayClick}
      className={classNames('w-fit text-black dark:text-white', className)}
      modifiersClassNames={{
        selected: 'bg-primary-300 text-white',
        today: 'my-today',
      }}
    />
  );
};

export default Calendar;
