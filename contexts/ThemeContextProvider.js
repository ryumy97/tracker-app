import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const THEME_KEY = 'THEME_COLOR_KEY';

const colours = {
    defaultTheme: {
        primary: '#ff6700',
        primaryLight: '#ff9e40',
        primaryDark: '#c43c00',
        secondary: '#3f51b5',
        secondaryLight: '#757de8',
        secondaryDark: '#002984',
        text: '#fffff',
        shadow: '#e0e0e0',
    },
};

const getTheme = async () => {
    try {
        const value = await AsyncStorage.getItem(THEME_KEY);
        if (value !== null) {
            return value;
        } else {
            return 'defaultTheme';
        }
    } catch (e) {
        return 'defaultTheme';
    }
};

const storeTheme = async (theme) => {
    try {
        await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (e) {
        throw new Error('Failed to save the theme.');
    }
};

const getKeys = () => Object.keys(themes);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme should be used inside ThemeProvider');
    }

    return context;
}

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('defaultTheme');
    const [colour, setColour] = useState({});

    useEffect(() => {
        (async () => {
            const theme = await getTheme();
            setTheme(theme);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await storeTheme(theme);
            setColour(colours[theme]);
        })();
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                getKeys,
                setTheme,
                colour,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
