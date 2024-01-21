import { ThemeSwitchProps } from '@/types/props/ThemeSwitchProps';
import { Theme } from '@/types/shared/Theme';
import { useEffect, useState } from 'react';

export function withThemeSelectorHoc<T extends ThemeSwitchProps>(
  WrappedComponent: React.FC<T>
) {
  const Component = (props: T) => {
    const [themeMode, setThemeMode] = useState<Theme>(Theme.LIGHT);

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      if (savedTheme) {
        if (savedTheme === 'dark') {
          setDarkTheme();
        } else {
          setLightTheme();
        }
      } else {
        if (prefersDark) {
          setDarkTheme();
        } else {
          setLightTheme();
        }
      }
    }, []);

    const setLightTheme = () => {
      setThemeMode(Theme.LIGHT);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    };

    const setDarkTheme = () => {
      setThemeMode(Theme.DARK);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    };

    return (
      <WrappedComponent
        {...props}
        selectedTheme={themeMode}
        onLightThemeClick={setLightTheme}
        onDarkThemeClick={setDarkTheme}
      />
    );
  };

  return Component;
}
