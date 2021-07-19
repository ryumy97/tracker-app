import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ATContextProvider from './contexts/ATContextProvider';
import LocationProvider from './contexts/LocationProvider';
import Navigation from './components/Navigation';

export default function App() {
    return (
        <SafeAreaProvider>
            <ATContextProvider>
                <LocationProvider>
                    <Navigation />
                </LocationProvider>
            </ATContextProvider>
        </SafeAreaProvider>
    );
}
