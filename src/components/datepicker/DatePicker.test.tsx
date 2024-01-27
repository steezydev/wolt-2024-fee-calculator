import DatePicker from './DatePicker';
import { dateFieldEventTests, dateFieldRenderTests } from './DatePicker.tests';

beforeEach(() => {
  Element.prototype.scrollTo = jest.fn();

  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-01'));
});

afterEach(() => {
  (Element.prototype.scrollTo as jest.Mock).mockRestore();

  jest.useRealTimers();
});

dateFieldRenderTests('DatePicker', DatePicker);
dateFieldEventTests('DatePicker', DatePicker);
