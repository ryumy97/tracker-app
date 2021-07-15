import React from 'react'
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export default function MapPage() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -41.28666552,
                    longitude: 171.772996908,
                    latitudeDelta: 24,
                    longitudeDelta: 12,
                }}>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#ff6700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});
  