import { TimeSelectorProps } from '@/types/props/TimeSelectorProps';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import TimeSelectorColumn from './TimeSelectorColumn';

const TimeSelector = ({
  time = new Date(new Date().setHours(0, 0, 0, 0)),
  onChange,
  className,
}: TimeSelectorProps) => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  // Create arrays of hours and minutes
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  // Scroll to the position of the selected item
  const scrollToPosition = useCallback(
    (ref: React.RefObject<HTMLDivElement>, value: number) => {
      const element = ref.current;
      if (element) {
        const child = element.children[value];

        const scrollPosition =
          (child as HTMLElement).offsetTop - element.clientHeight / 2 - 30;

        element.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }
    },
    []
  );

  // Scroll to the position of the selected item on mount
  useEffect(() => {
    if (time) {
      scrollToPosition(hourRef, time.getHours());
      scrollToPosition(minuteRef, time.getMinutes());
    }
  }, [scrollToPosition, time]);

  const handleChangeHour = (hour: number) => {
    onChange?.(hour, null);
  };

  const handleChangeMinute = (minute: number) => {
    onChange?.(null, minute);
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      <TimeSelectorColumn
        ref={hourRef}
        type='hour'
        items={hours}
        currentItem={time.getHours()}
        onChange={handleChangeHour}
      />
      <TimeSelectorColumn
        ref={minuteRef}
        type='minute'
        items={minutes}
        currentItem={time.getMinutes()}
        onChange={handleChangeMinute}
      />
    </div>
  );
};

export default TimeSelector;
