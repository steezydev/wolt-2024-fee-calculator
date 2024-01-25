import TimeSelector from './TimeSelector';
import {
  timeSelectorEventTests,
  timeSelectorRenderTests,
} from './TimeSelector.tests';

beforeEach(() => {
  Element.prototype.scrollTo = jest.fn();
});

afterEach(() => {
  (Element.prototype.scrollTo as jest.Mock).mockRestore();
});

timeSelectorRenderTests('TimeSelector', TimeSelector);
timeSelectorEventTests('TimeSelector', TimeSelector);
