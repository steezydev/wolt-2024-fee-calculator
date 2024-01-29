import { act, renderHook } from '@testing-library/react-hooks';

import useDatetimeSelector from '../useDatetimeSelector';

describe('useDatetimeSelector', () => {
  it('sets initial date correctly', () => {
    const initialDate = new Date(2024, 0, 1); // Jan 1, 2024
    const { result } = renderHook(() => useDatetimeSelector(initialDate));

    expect(result.current.value).toEqual(initialDate);
  });

  it('change date correctly with handleChangeDate', () => {
    const initialDate = new Date(2024, 0, 1, 12, 30); // Jan 1, 2024, 12:30
    const newDate = new Date(2024, 1, 15); // Feb 15, 2024
    const { result } = renderHook(() => useDatetimeSelector(initialDate));

    act(() => {
      result.current.handleChangeDate(newDate);
    });

    expect(result.current.value.getDate()).toBe(newDate.getDate());
    expect(result.current.value.getMonth()).toBe(newDate.getMonth());
    expect(result.current.value.getFullYear()).toBe(newDate.getFullYear());
    // Time should remain unchanged
    expect(result.current.value.getHours()).toBe(initialDate.getHours());
    expect(result.current.value.getMinutes()).toBe(initialDate.getMinutes());
  });

  it('changes time correctly with handleChangeTime', () => {
    const initialDate = new Date(2024, 0, 1, 12, 30); // Jan 1, 2024, 12:30
    const newHours = 14;
    const newMinutes = 45;
    const { result } = renderHook(() => useDatetimeSelector(initialDate));

    act(() => {
      result.current.handleChangeTime(newHours, newMinutes);
    });

    expect(result.current.value.getHours()).toBe(newHours);
    expect(result.current.value.getMinutes()).toBe(newMinutes);
    // Date should remain unchanged
    expect(result.current.value.getDate()).toBe(initialDate.getDate());
    expect(result.current.value.getMonth()).toBe(initialDate.getMonth());
    expect(result.current.value.getFullYear()).toBe(initialDate.getFullYear());
  });

  it('changes both date and time with handleChange', () => {
    const initialDate = new Date(2024, 0, 1, 12, 30); // Jan 1, 2024, 12:30
    const newDatetime = new Date(2024, 1, 15, 14, 45); // Feb 15, 2024, 14:45
    const { result } = renderHook(() => useDatetimeSelector(initialDate));

    act(() => {
      result.current.handleChange(newDatetime);
    });

    expect(result.current.value).toEqual(newDatetime);
  });
});
