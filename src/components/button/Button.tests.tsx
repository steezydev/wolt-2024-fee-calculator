import { ButtonProps } from '@/types/props/ButtonProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const buttonRenderTests = (
  name: string,
  Button: React.FC<ButtonProps>
) => {
  describe(name, () => {
    describe('when asked to render with children', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Button id='test-button' ariaLabel='Test button label'>
            Test Button
          </Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(
          <Button id='test-button' ariaLabel='Test button label'>
            Test Button
          </Button>
        );
        expect(screen.getByRole('button')).toHaveTextContent('Test Button');
      });
    });

    describe('when asked to render disabled', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Button id='test-button' ariaLabel='Test button label' disabled>
            Test Button
          </Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders disabled', () => {
        render(
          <Button id='test-button' ariaLabel='Test button label' disabled>
            Test Button
          </Button>
        );
        expect(screen.getByRole('button')).toBeDisabled();
      });
    });

    describe('when asked to render with additional class', () => {
      it('matches snapshot', () => {
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

      it('renders with additional class', () => {
        render(
          <Button
            className='some-class'
            id='test-button'
            ariaLabel='Test button label'
          >
            Test Button
          </Button>
        );

        expect(screen.getByRole('button')).toHaveClass('some-class');
      });
    });
  });
};

export const buttonEventTests = (
  name: string,
  Button: React.FC<ButtonProps>
) => {
  describe(name, () => {
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

    describe('when disabled clicked', () => {
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
