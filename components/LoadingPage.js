import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getVersion } from '../services/ATService';

export default function LoadingPage({ navigation }) {
    const [version, setVersion] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVersion()
        .then(version => {
            setVersion(version);
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        if (!loading) {
            navigation.navigate('Map')
        }
    }, [loading])

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
        color: '#fff',
    },
});
