import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ATContextProvider from './contexts/ATContextProvider';
import LocationProvider from './contexts/LocationProvider';
import ThemeProvider from './contexts/ThemeContextProvider';
import Navigation from './components/Navigation';

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <ATContextProvider>
                    <LocationProvider>
                        <Navigation />
                    </LocationProvider>
                </ATContextProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
