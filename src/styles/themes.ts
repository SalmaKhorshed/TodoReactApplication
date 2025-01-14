import { Theme } from '@react-navigation/native';

export const LightTheme: Theme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(255, 255, 255)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'normal'
        }
    }
};

export const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(28, 28, 30)',
        card: 'rgb(39, 39, 41)',
        text: 'rgb(255, 255, 255)',
        border: 'rgb(72, 72, 74)',
        notification: 'rgb(255, 69, 58)',
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'normal'
        }
    }
};
