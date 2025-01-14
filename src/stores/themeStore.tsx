import { create } from 'zustand';
import { LightTheme,DarkTheme } from '../styles/themes';

type ThemeState = {
    isDarkMode: boolean;
    theme: typeof LightTheme
    toggleDarkMode: () => void;
};
export const useThemeStore = create<ThemeState>((set: (arg0: (state: any) => { isDarkMode: boolean; }) => any) => ({
    isDarkMode: false,
    theme: LightTheme,
    toggleDarkMode: () => {
        set((state) => ({
            isDarkMode: !state.isDarkMode,
            theme: state.isDarkMode ? DarkTheme : LightTheme,
        }));
    },
}));
