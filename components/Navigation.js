import React from 'react'
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './LoadingPage';
import MapPage from './MapPage';

const Stack = createStackNavigator();

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
                                outputRange: [
                                    screen.width,
                                    0,
                                    screen.width * -1,
                                ],
                                extrapolate: 'clamp',
                            }),
                            inverted
                        ),
                    },
                ],
            },
        };
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: rightToLeftSlideAnimation
                }}
            >
                <Stack.Screen
                    name="Loading"
                    component={LoadingPage}
                />
                <Stack.Screen name="Map" component={MapPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}