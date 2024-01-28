import { InputLabelProps } from '@/types/props/InputLabelProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const inputLabelRenderTests = (
  name: string,
  InputLabel: React.FC<InputLabelProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <InputLabel label='Test label' id='testInput'>
            <input id='testInput' name='testInput' />
          </InputLabel>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with error', () => {
      it('renders with error', () => {
        const component = TestRenderer.create(
          <InputLabel
            label='Test label'
            id='testInput'
            errorMessage='Test error'
            isInvalid={true}
          >
            <input aria-invalid={true} id='testInput' name='testInput' />
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
            <input id='testInput' name='testInput' />
          </InputLabel>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
