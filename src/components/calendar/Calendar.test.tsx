import Calendar from './Calendar';
import { calendarEventTests, calendarRenderTests } from './Calendar.tests';

// Mocking current date to 01.01.2024
beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-01'));
});

afterEach(() => {
  jest.useRealTimers();
});

calendarRenderTests('Calendar', Calendar);
calendarEventTests('Calendar', Calendar);
