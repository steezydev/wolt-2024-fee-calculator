import { ButtonProps } from '@/types/props/ButtonProps';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const buttonRenderTests = (
  name: string,
  Button: React.FC<ButtonProps>
) => {
  // === Snapshot tests ===

  describe(name, () => {
    describe('when asked to render with children', () => {
      it('renders with children', () => {
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

    // === Event tests ===

    describe('when clicked', () => {
      it('triggers onClick event', () => {
        const handleClick = jest.fn();
        const { getByRole } = render(
          <Button
            id='test-button'
            ariaLabel='Test button label'
            onClick={handleClick}
          >
            Test Button
          </Button>
        );

        fireEvent.click(getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
      });
    });

    describe('when disabled', () => {
      it('does not trigger onClick event', () => {
        const handleClick = jest.fn();
        const { getByRole } = render(
          <Button
            disabled
            id='test-button'
            ariaLabel='Test button label'
            onClick={handleClick}
          >
            Test Button
          </Button>
        );

        fireEvent.click(getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
      });
    });
  });
};
