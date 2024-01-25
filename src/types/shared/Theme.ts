export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
}
