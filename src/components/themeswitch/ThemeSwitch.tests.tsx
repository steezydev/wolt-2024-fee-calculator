import { ThemeSwitchProps } from '@/types/props/ThemeSwitchProps';
import { Theme } from '@/types/shared/Theme';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const themeSwitchRenderTests = (
  name: string,
  ThemeSwitch: React.FC<ThemeSwitchProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(<ThemeSwitch />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with light theme selected', () => {
      it('renders with light theme selected', () => {
        const component = TestRenderer.create(
          <ThemeSwitch selectedTheme={Theme.LIGHT} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with dark theme selected', () => {
      it('renders with dark theme selected', () => {
        const component = TestRenderer.create(
          <ThemeSwitch selectedTheme={Theme.DARK} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders wtih additional class', () => {
        const component = TestRenderer.create(
          <ThemeSwitch className='some-class' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
