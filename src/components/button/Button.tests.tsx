import { ButtonProps } from '@/types/props/ButtonProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

//TODO: Add event and state tests

export const buttonRenderTests = (
  name: string,
  Button: React.FC<ButtonProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <Button id='test-button' ariaLabel='Test button label'>
            Test Button
          </Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render disabled', () => {
      it('renders disabled', () => {
        const component = TestRenderer.create(
          <Button
            className='some-class'
            id='test-button'
            ariaLabel='Test button label'
            disabled
          >
            Test Button
          </Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
        const component = TestRenderer.create(
          <Button
            className='some-class'
            id='test-button'
            ariaLabel='Test button label'
          >
            Test Button
          </Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
