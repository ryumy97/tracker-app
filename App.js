import 'react-native-gesture-handler';

import React from 'react';
import LoadingPage from './components/LoadingPage';
import MapPage from './components/MapPage';
import ATContextProvider from './contexts/ATContextProvider';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ATContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Loading"
            component={LoadingPage}
          />
          <Stack.Screen name="Map" component={MapPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ATContextProvider>
  );
}
