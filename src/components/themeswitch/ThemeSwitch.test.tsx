import { mockContext } from '@/helpers/tests';

import ThemeSwitch from './ThemeSwitch';
import {
  themeSwitchEventTests,
  themeSwitchRenderTests,
} from './ThemeSwitch.tests';

mockContext();

themeSwitchRenderTests('ThemeSwitch', ThemeSwitch);
themeSwitchEventTests('ThemeSwitch', ThemeSwitch);
