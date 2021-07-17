import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useLocation } from '../../contexts/LocationProvider';
import CurrentLocationMarker from './CurrentLocationMarker';

export default function MapPage() {
    const { errorMsg, location } = useLocation();
    const [region, setRegion] = useState({
        latitude: -41.28666552,
        longitude: 171.772996908,
        latitudeDelta: 24,
        longitudeDelta: 12,
    });

    useEffect(() => {
        if (location && location.coords) {
            const {
                coords: { latitude, longitude },
            } = location;
            setRegion((region) => {
                return {
                    ...region,
                    latitude,
                    longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.005,
                };
            });
        }
    }, [location]);

    return (
        <View style={styles.container}>
            {errorMsg ? <Text>{errorMsg}</Text> : null}
            <MapView style={styles.map} region={region}>
                <CurrentLocationMarker />
            </MapView>
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
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
