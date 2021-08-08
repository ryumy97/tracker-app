import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const THEME_KEY = 'THEME_COLOR_KEY';

const colours = {
    defaultTheme: {
        name: 'Default Theme',
        primary: '#ff6700',
        primaryLight: '#ff9e40',
        primaryDark: '#c43c00',
        secondary: '#3f51b5',
        secondaryLight: '#757de8',
        secondaryDark: '#002984',
        text: '#fffff',
        shadow: '#e0e0e0',
    },
    secondaryTheme: {
        name: 'Secondary Theme',
        primary: '#311b92',
        primaryLight: '#6746c3',
        primaryDark: '#000063',
        secondary: '#263238',
        secondaryLight: '#4f5b62',
        secondaryDark: '#000a12',
        text: '#fffff',
        shadow: '#e0e0e0',
    },
};

const getTheme = async () => {
    try {
        const value = await AsyncStorage.getItem(THEME_KEY);
        if (value) {
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

const getKeys = () => Object.keys(colours);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme should be used inside ThemeProvider');
    }

    return context;
}

export default function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState('defaultTheme');
    const [currentColour, setCurrentColour] = useState({});

    useEffect(() => {
        (async () => {
            const theme = await getTheme();
            setCurrentTheme(theme);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await storeTheme(currentTheme);
            setCurrentColour(colours[currentTheme]);
        })();
        console.log(currentTheme);
    }, [currentTheme]);

    const isCurrentTheme = (theme) => theme === currentTheme;

    return (
        <ThemeContext.Provider
            value={{
                getKeys,
                setCurrentTheme,
                isCurrentTheme,
                colours,
                currentColour,
                currentTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
