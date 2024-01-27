import { ThemeProvider } from '@/context/ThemeContext';
import { ThemeSwitchProps } from '@/types/props/ThemeSwitchProps';
import { Theme } from '@/types/shared/Theme';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const themeSwitchRenderTests = (
  name: string,
  ThemeSwitch: React.FC<ThemeSwitchProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <ThemeProvider>
            <ThemeSwitch />
          </ThemeProvider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders wtih additional class', () => {
        const component = TestRenderer.create(
          <ThemeProvider>
            <ThemeSwitch className='some-class' />
          </ThemeProvider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};

export const themeSwitchEventTests = (
  name: string,
  ThemeSwitch: React.FC<ThemeSwitchProps>
) => {
  describe(name, () => {
    describe('when clicked', () => {
      it('toggles theme and updates localStorage', () => {
        render(
          <ThemeProvider>
            <ThemeSwitch />
          </ThemeProvider>
        );

        const lightThemeButton = screen.getByLabelText('Set light theme');
        const darkThemeButton = screen.getByLabelText('Set dark theme');

        // Clicking dark theme button
        fireEvent.click(darkThemeButton);
        expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.DARK);

        // Clicking light theme button
        fireEvent.click(lightThemeButton);
        expect(localStorage.setItem).toHaveBeenCalledWith('theme', Theme.LIGHT);
      });
    });
  });
};
