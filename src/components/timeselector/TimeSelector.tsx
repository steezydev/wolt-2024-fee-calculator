import { timeToDate } from '@/helpers/date';
import { TimeSelectorProps } from '@/types/props/TimeSelectorProps';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import TimeSelectorColumn from './TimeSelectorColumn';

const TimeSelector = ({
  time = new Date(),
  onTimeChange,
  className,
}: TimeSelectorProps) => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  // Create arrays of hours and minutes
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  // Scroll to the position of the selected item on mount
  useEffect(() => {
    scrollToPosition(hourRef, time.getHours());
    scrollToPosition(minuteRef, time.getMinutes());
  }, [time]);

  // Scroll to the position of the selected item
  const scrollToPosition = useCallback(
    (ref: React.RefObject<HTMLDivElement>, value: number) => {
      const element = ref.current;
      if (element) {
        const child = element.children[value];
        const scrollPosition =
          (child as HTMLElement).offsetTop - element.clientHeight / 2;
        element.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }
    },
    []
  );

  const handleTimeChange = useCallback(
    (hour: number, minute: number) => {
      onTimeChange?.(timeToDate(hour, minute));
    },
    [onTimeChange]
  );

  return (
    <div className={`flex gap-1 ${className}`}>
      <TimeSelectorColumn
        ref={hourRef}
        type='hour'
        items={hours}
        currentItem={time.getHours()}
        onChange={(value) => handleTimeChange(value, time.getMinutes())}
      />
      <TimeSelectorColumn
        ref={minuteRef}
        type='minute'
        items={minutes}
        currentItem={time.getMinutes()}
        onChange={(value) => handleTimeChange(time.getHours(), value)}
      />
    </div>
  );
};

export default TimeSelector;
