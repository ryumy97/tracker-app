import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useATContext } from '../contexts/ATContextProvider';

export default function LoadingPage({ navigation }) {
    const { version, fetchVersion } = useATContext();
    const [loading, setLoading] = useState(true);
    const [shouldWait, setShouldWait] = useState(true);

    useEffect(() => {
        fetchVersion()
        .then(setLoading(false));
    }, [])

    useEffect(() => {
        if (!loading) {
            const timeOut = setTimeout(() => {
                setShouldWait(false)
            }, 3000)
            return () => clearTimeout(timeOut)
        }
    }, [loading])

    useEffect(() => {
        if (!shouldWait && !loading) {
            navigation.navigate('Map')
        }
    }, [shouldWait, loading])

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
