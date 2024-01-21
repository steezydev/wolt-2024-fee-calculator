import { ClassNameProps } from '@/types/props/ClassNameProps';
import { Theme } from '@/types/shared/Theme';

export declare interface ThemeSwitchProps extends ClassNameProps {
    selectedTheme?: Theme;
    onLightThemeClick?: () => void;
    onDarkThemeClick?: () => void;
}
