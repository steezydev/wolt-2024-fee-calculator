import { mockScrollTo, setupFakeDate } from '@/helpers/tests';

import DatePicker from './DatePicker';
import { dateFieldEventTests, dateFieldRenderTests } from './DatePicker.tests';

mockScrollTo();
setupFakeDate();

dateFieldRenderTests('DatePicker', DatePicker);
dateFieldEventTests('DatePicker', DatePicker);
