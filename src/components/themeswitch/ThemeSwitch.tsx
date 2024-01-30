import ButtonRound from '@/components/button/ButtonRound';
import MoonIcon from '@/components/icons/MoonIcon';
import SunIcon from '@/components/icons/SunIcon';
import { useTheme } from '@/context/ThemeContext';
import { classNames } from '@/helpers/classNames';
import { ThemeSwitchProps } from '@/types/props/ThemeSwitchProps';
import { Theme } from '@/types/shared/Theme';

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('flex gap-3', className)}>
      <ButtonRound
        onClick={() => toggleTheme(Theme.LIGHT)}
        id='light-theme-button'
        ariaLabel='Set light theme'
        ariaSelected={theme === Theme.LIGHT}
        className={classNames(
          theme === Theme.LIGHT ? 'bg-primary-300 text-white' : ''
        )}
      >
        <SunIcon />
      </ButtonRound>
      <ButtonRound
        onClick={() => toggleTheme(Theme.DARK)}
        id='dark-theme-button'
        ariaLabel='Set dark theme'
        ariaSelected={theme === Theme.DARK}
        className={classNames(
          theme === Theme.DARK ? 'bg-primary-300 text-white' : ''
        )}
      >
        <MoonIcon />
      </ButtonRound>
    </div>
  );
};

export default ThemeSwitch;
