import { InputProps } from '@/types/props/InputProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

//TODO: Add event tests

export const inputRenderTests = (name: string, Input: React.FC<InputProps>) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <Input
            id='test-input'
            name='test-input'
            type='text'
            ariaLabel='Test label'
          />
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
            type='text'
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
            type='text'
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
            type='text'
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
            type='text'
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
            type='text'
            ariaLabel='Test label'
            autoFocus
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
