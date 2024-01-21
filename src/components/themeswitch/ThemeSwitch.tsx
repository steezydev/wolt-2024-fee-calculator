import ButtonRound from '@/components/button/ButtonRound';
import MoonIcon from '@/components/icons/MoonIcon';
import SunIcon from '@/components/icons/SunIcon';
import { classNames } from '@/helpers/classNames';
import { ThemeSwitchProps } from '@/types/props/ThemeSwitchProps';
import { Theme } from '@/types/shared/Theme';

const ThemeSwitch = ({
  selectedTheme,
  onLightThemeClick,
  onDarkThemeClick,
  className,
}: ThemeSwitchProps) => {
  return (
    <div className={classNames('flex gap-3', className)}>
      <ButtonRound
        onClick={onLightThemeClick}
        id='light-theme-button'
        ariaLabel='Set light theme'
        className={classNames(
          selectedTheme === Theme.LIGHT ? 'bg-primary-300 text-white' : ''
        )}
      >
        <SunIcon />
      </ButtonRound>
      <ButtonRound
        onClick={onDarkThemeClick}
        id='dark-theme-button'
        ariaLabel='Set dark theme'
        className={classNames(
          selectedTheme === Theme.DARK ? 'bg-primary-300 text-white' : ''
        )}
      >
        <MoonIcon />
      </ButtonRound>
    </div>
  );
};

export default ThemeSwitch;
