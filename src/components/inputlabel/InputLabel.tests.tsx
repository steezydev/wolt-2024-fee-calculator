import InputRegular from '@/components/input/InputRegular';
import { InputLabelProps } from '@/types/props/InputLabelProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const inputLabelRenderTests = (
  name: string,
  InputLabel: React.FC<InputLabelProps>
) => {
  describe(name, () => {
    describe('when asked to render with label', () => {
      it('renders with label', () => {
        const component = TestRenderer.create(
          <InputLabel label='Test label' id='testInput'>
            <InputRegular
              required
              id='testInput'
              name='testInput'
              ariaLabel='Test label'
            />
          </InputLabel>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <InputLabel label='Test label' id='test-input' className='some-class'>
            <InputRegular
              required
              id='test-input'
              name='test-input'
              type='number'
              ariaLabel='Test label'
              placeholder='20'
              onChange={() => {}}
              value={'20'}
            />
          </InputLabel>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
