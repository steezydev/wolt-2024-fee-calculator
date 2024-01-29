import { setupFakeDate } from '@/helpers/tests';

import Calendar from './Calendar';
import { calendarEventTests, calendarRenderTests } from './Calendar.tests';

setupFakeDate();

calendarRenderTests('Calendar', Calendar);
calendarEventTests('Calendar', Calendar);
