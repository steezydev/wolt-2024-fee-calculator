import {
  timeSelectorItemEventTests,
  timeSelectorItemRenderTests,
} from './TimeSelector.tests';
import TimeSelectorItem from './TimeSelectorItem';

timeSelectorItemRenderTests('TimeSelectorItem', TimeSelectorItem);
timeSelectorItemEventTests('TimeSelectorItem', TimeSelectorItem);
