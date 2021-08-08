import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useATContext } from '../contexts/ATContextProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeProvider';

export default function LoadingPage({ navigation }) {
    const { currentColour } = useTheme();
    const { version, fetchVersion, stops, fetchStops } = useATContext();
    const [shouldWait, setShouldWait] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const timeOut = setTimeout(() => {
                setShouldWait(false);
            }, 1000);

            return () => clearTimeout(timeOut);
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await Promise.all([fetchStops(), fetchVersion()]);
            })();
        }, [])
    );

    useEffect(() => {
        if (!shouldWait && version && stops.length !== 0) {
            navigation.navigate('Map');
        }
    }, [shouldWait, version, stops]);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: currentColour.primary,
                    color: currentColour.textLight,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: currentColour.textLight,
                    },
                ]}
            >
                {version}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    },
});
