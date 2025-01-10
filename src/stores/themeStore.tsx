import { create } from 'zustand';

type ThemeState = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};
export const useThemeStore = create<ThemeState>((set: (arg0: (state: any) => { isDarkMode: boolean; }) => any) => ({
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
