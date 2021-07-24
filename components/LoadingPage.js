import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useATContext } from '../contexts/ATContextProvider';
import { useFocusEffect } from '@react-navigation/native';

export default function LoadingPage({ navigation }) {
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
        <View style={styles.container}>
            <Text style={styles.text}>{version}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#ff6700',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#fff',
    },
});
