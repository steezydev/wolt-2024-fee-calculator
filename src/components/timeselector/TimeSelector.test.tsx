import { mockScrollTo } from '@/helpers/tests';

import TimeSelector from './TimeSelector';
import {
  timeSelectorEventTests,
  timeSelectorRenderTests,
} from './TimeSelector.tests';

mockScrollTo();

timeSelectorRenderTests('TimeSelector', TimeSelector);
timeSelectorEventTests('TimeSelector', TimeSelector);
