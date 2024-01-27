import {
  timeSelectorColumnEventTests,
  timeSelectorColumnRenderTests,
} from './TimeSelector.tests';
import TimeSelectorColumn from './TimeSelectorColumn';

timeSelectorColumnRenderTests('TimeSelectorColumn', TimeSelectorColumn);
timeSelectorColumnEventTests('TimeSelectorColumn', TimeSelectorColumn);
