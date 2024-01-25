import { InputProps } from '@/types/props/InputProps';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import TestRenderer from 'react-test-renderer';

//TODO: Add event tests

export const inputRenderTests = (name: string, Input: React.FC<InputProps>) => {
  // === Snapshot tests ===

  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <Input id='test-input' name='test-input' ariaLabel='Test label' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render disabled', () => {
      it('renders disabled', () => {
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
    });

    describe('when asked to render with placeholder', () => {
      it('renders with placeholder', () => {
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
    });

    describe('when asked to render with value', () => {
      it('renders with placeholder', () => {
        const component = TestRenderer.create(
          <Input
            id='test-input'
            name='test-input'
            ariaLabel='Test label'
            value='Test value'
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render required', () => {
      it('renders required', () => {
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
    });

    describe('when asked to render autofocused', () => {
      it('renders autofocused', () => {
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
    });

    // === Event tests ===

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
