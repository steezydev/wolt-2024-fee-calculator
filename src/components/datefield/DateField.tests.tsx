import { DateFieldProps } from '@/types/props/DateFieldProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

import InputRegular from '../input/InputRegular';

export const dateFieldRenderTests = (
  name: string,
  DateField: React.FC<DateFieldProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <DateField
            date={new Date()}
            renderInput={(inputProps) => (
              <InputRegular
                {...inputProps}
                className='w-full'
                id='deliveryOrderDateTimeInput'
                name='deliveryOrderDateTimeInput'
                ariaLabel='Order time'
                placeholder='hh.mm.yyyy HH:MM'
                type='text'
              />
            )}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <DateField
            className='some-class'
            date={new Date()}
            renderInput={(inputProps) => (
              <InputRegular
                {...inputProps}
                className='w-full'
                id='deliveryOrderDateTimeInput'
                name='deliveryOrderDateTimeInput'
                ariaLabel='Order time'
                placeholder='hh.mm.yyyy HH:MM'
                type='text'
              />
            )}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
