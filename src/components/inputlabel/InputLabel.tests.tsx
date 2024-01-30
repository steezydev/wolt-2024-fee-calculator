import { InputLabelProps } from '@/types/props/InputLabelProps';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const inputLabelRenderTests = (
  name: string,
  InputLabel: React.FC<InputLabelProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <InputLabel label='Test label' id='testInput'>
            <input id='testInput' name='testInput' />
          </InputLabel>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(
          <InputLabel label='Test label' id='testInput'>
            <input id='testInput' name='testInput' />
          </InputLabel>
        );
        const label = screen.getByText('Test label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute('for', 'testInput');

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
      });
    });

    describe('when asked to render with error message', () => {
      it('matches snapshot', () => {
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

      it('renders with error', () => {
        render(
          <InputLabel
            label='Test label'
            id='testInput'
            errorMessage='Test error'
            isInvalid={true}
          >
            <input aria-invalid={true} id='testInput' name='testInput' />
          </InputLabel>
        );

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('aria-invalid', 'true');

        const error = screen.getByText('Test error');
        expect(error).toBeInTheDocument();
      });
    });

    describe('when asked to render with additional class', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <InputLabel label='Test label' id='test-input' className='some-class'>
            <input id='testInput' name='testInput' />
          </InputLabel>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with additional class', () => {
        const { container } = render(
          <InputLabel label='Test label' id='test-input' className='some-class'>
            <input id='testInput' name='testInput' />
          </InputLabel>
        );

        expect(container.firstChild).toHaveClass('some-class');
      });
    });
  });
};
