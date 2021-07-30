import React from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './LoadingPage';
import MapPage from './Map/MapPage';
import SettingsModal from './Settings/SettingsModal';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

export default function Navigation() {
    const rightToLeftSlideAnimation = ({ current, next, inverted, layouts: { screen } }) => {
        const progress = Animated.add(
            current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            next
                ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                  })
                : 0
        );

        return {
            cardStyle: {
                transform: [
                    {
                        translateX: Animated.multiply(
                            progress.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [screen.width, 0, screen.width * -1],
                                extrapolate: 'clamp',
                            }),
                            inverted
                        ),
                    },
                ],
            },
        };
    };

    const MainStackNavigation = () => {
        return (
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: rightToLeftSlideAnimation,
                }}
            >
                <MainStack.Screen name="Loading" component={LoadingPage} />
                <MainStack.Screen name="Map" component={MapPage} />
            </MainStack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: ({ current: { progress } }) => ({
                        cardStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 0.5, 0.9, 1],
                                outputRange: [0, 0.25, 0.7, 1],
                            }),
                        },
                        overlayStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                                extrapolate: 'clamp',
                            }),
                        },
                    }),
                }}
                mode="modal"
            >
                <RootStack.Screen name="main" component={MainStackNavigation} />
                <RootStack.Screen name="settingsMenu" component={SettingsModal} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
