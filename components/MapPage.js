import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapPage() {
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [region, setRegion] = useState({
        latitude: -41.28666552,
        longitude: 171.772996908,
        latitudeDelta: 24,
        longitudeDelta: 12,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        if (location.coords) {
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
                {location.coords ? (
                    <Circle
                        center={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        radius={location.coords.accuracy | 1}
                        strokeColor="rgba(50,180,255,0.25)"
                        fillColor="rgba(50,180,255,0.1)"
                        lineJoin="round"
                    />
                ) : null}
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
