import { dateTimeStringToDate, isValidDate } from '@/helpers/date';
import { useState } from 'react';

const useDatetimeSelector = (initialValue: Date) => {
    const [value, setValue] = useState(initialValue);

    const handleChangeDate = (newDate: Date) => {
        setValue((prev) => {
            let updatedDate = new Date(prev);
            updatedDate.setDate(newDate.getDate());
            updatedDate.setMonth(newDate.getMonth());
            updatedDate.setFullYear(newDate.getFullYear());

            return updatedDate;
        });
    };

    const handleChangeTime = (newTime: Date) => {
        setValue((prev) => {
            let updatedDate = new Date(prev);
            updatedDate.setHours(newTime.getHours());
            updatedDate.setMinutes(newTime.getMinutes());

            return updatedDate;
        });
    };

    const handleChangeDatetime = (newDatetime: Date) => {
        setValue(newDatetime);
    };

    const handleChangeTextValue = (newTextValue: string) => {
        if (isValidDate(newTextValue)) {
            //setLastValidValue(value);
            setValue(dateTimeStringToDate(newTextValue));
        }
    };

    return {
        value,
        handleChangeDate,
        handleChangeTime,
        handleChangeDatetime,
    };
};

export default useDatetimeSelector;
