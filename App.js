import 'react-native-gesture-handler';

import React from 'react';
import ATContextProvider from './contexts/ATContextProvider';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <ATContextProvider>
      <Navigation></Navigation>
    </ATContextProvider>
  );
}
