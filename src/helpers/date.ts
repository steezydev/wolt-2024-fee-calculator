import { parse } from 'date-fns';

export const isValidDate = (dateStr: string): boolean => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;
    if (!regex.test(dateStr)) return false;

    // Get date components from string
    const [_, day, month, year, hour, minute] = regex
        .exec(dateStr)!
        .map(Number);
    const date = new Date(year, month - 1, day, hour, minute);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date.getHours() === hour &&
        date.getMinutes() === minute
    );
};

export const autoCompleteDate = (dateStr: string): string => {
    // Regular expression to match partial date-time inputs
    const regex = /^(\d{0,2})\.?(\d{0,2})\.?(\d{0,4}) ?(\d{0,2})?:?(\d{0,2})?$/;
    const matches = dateStr.match(regex);
    if (!matches) return dateStr;

    // Get date components from string
    let [_, day, month, year, hour, minute] = matches;

    // Current date as fallback
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
    const currentDay = currentDate.getDate().toString().padStart(2, '0');

    // Auto-complete year, month, and day
    year = year.padStart(
        4,
        year.length === 2 ? '20' : currentYear.slice(0, 4 - year.length)
    );
    month = month.padStart(2, currentMonth.slice(0, 2 - month.length));
    day = day.padStart(2, currentDay.slice(0, 2 - day.length));

    // Auto-complete hour and minute
    if (hour && hour.length === 1) {
        hour += '0'; // Add trailing zero if only one digit is entered
    } else if (hour === undefined || hour.length === 0) {
        hour = '00'; // Default to 00 if hour is empty
    }

    if (minute && minute.length === 1) {
        minute += '0'; // Add trailing zero if only one digit is entered
    } else if (minute === undefined || minute.length === 0) {
        minute = '00'; // Default to 00 if minute is empt
    }

    return `${day}.${month}.${year} ${hour}:${minute}`;
};

export const dateTimeStringToDate = (dateTimeString: string): Date => {
    return parse(dateTimeString, 'dd.MM.yyyy HH:mm', new Date());
};

export const setDateDate = (date: Date, newDate: Date): Date => {
    const newDateDate = new Date(date);
    newDateDate.setFullYear(newDate.getFullYear());
    newDateDate.setMonth(newDate.getMonth());
    newDateDate.setDate(newDate.getDate());

    return newDateDate;
};
