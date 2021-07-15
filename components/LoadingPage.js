import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getVersion } from '../services/ATService';

export default function LoadingPage() {
    const [version, setVersion] = useState('');

    useEffect(async () => {
        const v = await getVersion();
        setVersion(v);
    }, []);

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
