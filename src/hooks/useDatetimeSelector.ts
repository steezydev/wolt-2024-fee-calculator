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

    return {
        value,
        handleChangeDate,
        handleChangeTime,
        handleChangeDatetime,
    };
};

export default useDatetimeSelector;
