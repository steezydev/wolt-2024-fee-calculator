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

    const handleChangeTime = (
        newHours: number | null,
        newMinutes: number | null
    ) => {
        setValue((prev) => {
            const currentOrderDate = prev;
            const updatedHours =
                newHours !== null ? newHours : currentOrderDate.getHours();
            const updatedMinutes =
                newMinutes !== null
                    ? newMinutes
                    : currentOrderDate.getMinutes();

            return new Date(
                currentOrderDate.setHours(updatedHours, updatedMinutes)
            );
        });
    };

    const handleChange = (newDatetime: Date) => {
        setValue(newDatetime);
    };

    return {
        value,
        handleChangeDate,
        handleChangeTime,
        handleChange,
    };
};

export default useDatetimeSelector;
