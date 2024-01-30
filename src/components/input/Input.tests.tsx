import { InputProps } from '@/types/props/InputProps';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const inputRenderTests = (name: string, Input: React.FC<InputProps>) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('matches the snapshot', () => {
        const component = TestRenderer.create(
          <Input id='test-input' name='test-input' ariaLabel='Test label' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(
          <Input id='test-input' name='test-input' ariaLabel='Test label' />
        );

        const input = screen.getByRole('textbox');

        expect(input).toBeInTheDocument();

        expect(input).toHaveAttribute('id', 'test-input');
        expect(input).toHaveAttribute('name', 'test-input');
        expect(input).toHaveAttribute('aria-label', 'Test label');
      });
    });

    describe('when asked to render disabled', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            disabled
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders disabled', () => {
        render(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            disabled
          />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
      });
    });

    describe('when asked to render with placeholder', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            placeholder='Test placeholder'
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with placeholder', () => {
        render(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            placeholder='Test placeholder'
          />
        );

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('placeholder', 'Test placeholder');
      });
    });

    describe('when asked to render with value', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            value='Test value'
            onChange={() => {}}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with value', () => {
        render(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            value='Test value'
            onChange={() => {}}
          />
        );

        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('Test value');
      });
    });

    describe('when asked to render required', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            required
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders required', () => {
        render(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            required
          />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeRequired();
      });
    });

    describe('when asked to render autofocused', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            autoFocus
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders autofocused', () => {
        render(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            autoFocus
          />
        );

        const input = screen.getByRole('textbox');
        expect(input).toHaveFocus();
      });
    });
  });
};

export const inputEventTests = (name: string, Input: React.FC<InputProps>) => {
  describe(name, () => {
    describe('when value is changed', () => {
      it('onChange is called', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();

        render(
          <Input
            id='testInput'
            name='testInput'
            ariaLabel='Test label'
            onChange={onChange}
          />
        );

        const input = screen.getByRole<HTMLInputElement>('textbox');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
        await user.type(input, 'hello world');
        expect(input.value).toBe('hello world');
        expect(onChange).toHaveBeenCalledTimes(11);
      });
    });

    describe('when focused', () => {
      it('onFocus is called', async () => {
        const onFocus = jest.fn();

        render(
          <Input
            id='testInput'
            name='testInput'
            ariaLabel='Test label'
            onFocus={onFocus}
          />
        );

        const input = screen.getByRole<HTMLInputElement>('textbox');
        act(() => input.focus());
        expect(onFocus).toHaveBeenCalledTimes(1);
      });
    });

    describe('when blured', () => {
      it('onBlur is called', async () => {
        const onBlur = jest.fn();

        render(
          <Input
            id='testInput'
            name='testInput'
            ariaLabel='Test label'
            onBlur={onBlur}
          />
        );

        const input = screen.getByRole<HTMLInputElement>('textbox');
        act(() => {
          input.focus();
          input.blur();
        });
        expect(onBlur).toHaveBeenCalledTimes(1);
      });
    });
  });
};
