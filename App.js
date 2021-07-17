import 'react-native-gesture-handler';

import React from 'react';
import ATContextProvider from './contexts/ATContextProvider';
import LocationProvider from './contexts/LocationProvider';
import Navigation from './components/Navigation';

export default function App() {
    return (
        <ATContextProvider>
            <LocationProvider>
                <Navigation></Navigation>
            </LocationProvider>
        </ATContextProvider>
    );
}
