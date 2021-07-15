import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getVersion } from '../services/ATService';
import { useATContext } from '../contexts/ATContextProvider';

export default function LoadingPage({ navigation }) {
    const { version, fetchVersion } = useATContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVersion()
        .then(setLoading(false));
    }, [])

    useEffect(() => {
        if (!loading) {
            navigation.navigate('Map')
        }
    }, [loading])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
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
