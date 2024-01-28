import DeliveryFeeForm from './DeliveryFeeForm';
import {
  deliveryFeeFormEventTests,
  deliveryFeeFormRenderTests,
} from './DeliveryFeeForm.tests';

beforeEach(() => {
  Element.prototype.scrollTo = jest.fn();

  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-01'));
});

afterEach(() => {
  (Element.prototype.scrollTo as jest.Mock).mockRestore();

  jest.useRealTimers();
});

deliveryFeeFormRenderTests('DeliveryFeeForm', DeliveryFeeForm);
deliveryFeeFormEventTests('DeliveryFeeForm', DeliveryFeeForm);
