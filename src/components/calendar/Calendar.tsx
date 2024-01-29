import { setDateDate } from '@/helpers/date';
import { CalendarProps } from '@/types/props/CalendarProps';
import { enGB } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, onChange }: CalendarProps) => {
  const handleDateChange = (date: Date | null) => {
    if (date == null) return;
    onChange?.(setDateDate(selectedDate ?? new Date(), date));
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      locale={enGB}
      inline
    />
  );
};

export default Calendar;
