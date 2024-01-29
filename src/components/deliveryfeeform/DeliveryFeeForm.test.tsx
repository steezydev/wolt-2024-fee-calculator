import { mockScrollTo, setupFakeDate } from '@/helpers/tests';

import DeliveryFeeForm from './DeliveryFeeForm';
import {
  deliveryFeeFormEventTests,
  deliveryFeeFormRenderTests,
} from './DeliveryFeeForm.tests';

setupFakeDate();
mockScrollTo();

deliveryFeeFormRenderTests('DeliveryFeeForm', DeliveryFeeForm);
deliveryFeeFormEventTests('DeliveryFeeForm', DeliveryFeeForm);
