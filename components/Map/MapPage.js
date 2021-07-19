import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useLocation } from '../../contexts/LocationProvider';
import CurrentLocationMarker from './CurrentLocationMarker';
import SearchBar from './SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapPage() {
    const { errorMsg, location } = useLocation();
    const [isMapReady, setIsMapReady] = useState(false);
    const mapRef = useRef(null);
    const searchBarRef = useRef(null);

    useEffect(() => {
        if (isMapReady && location && location.coords) {
            const {
                coords: { latitude, longitude },
            } = location;
            mapRef.current.animateToRegion({ latitude, longitude, latitudeDelta: 0.001, longitudeDelta: 0.005 }, 2000);
        }
    }, [location, isMapReady]);

    return (
        <View style={styles.container}>
            {errorMsg ? <Text>{errorMsg}</Text> : null}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: -36.84513286676243,
                    latitudeDelta: 0.7712628982843839,
                    longitude: 174.75105894729495,
                    longitudeDelta: 0.45652840286496144,
                }}
                onMapReady={() => {
                    setIsMapReady(true);
                }}
                onTouchStart={() => {
                    searchBarRef.current.blur();
                }}
            >
                <CurrentLocationMarker />
            </MapView>
            <SafeAreaView style={styles.searchBar}>
                <SearchBar ref={searchBarRef}></SearchBar>
            </SafeAreaView>
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
    searchBar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        marginLeft: 5,
        marginRight: 5,
    },
});
