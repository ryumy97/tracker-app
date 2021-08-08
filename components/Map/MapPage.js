import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useLocation } from '../../contexts/LocationProvider';
import CurrentLocationMarker from './CurrentLocationMarker';
import SearchBar from './SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClusterMarkers from './ClusterMarkers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../contexts/ThemeProvider';

export default function MapPage({ navigation }) {
    const { currentColour } = useTheme();
    const { errorMsg, location, aspectRatio } = useLocation();
    const [currentRegion, setCurrentRegion] = useState({});
    const [isMapReady, setIsMapReady] = useState(false);
    const mapRef = useRef(null);
    const searchBarRef = useRef(null);

    useEffect(() => {
        if (isMapReady && location && location.coords) {
            const {
                coords: { latitude, longitude },
            } = location;
            mapRef.current.animateToRegion(
                { latitude, longitude, latitudeDelta: 0.015, longitudeDelta: 0.015 * aspectRatio },
                500
            );
        }
    }, [location, isMapReady]);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: currentColour.primary,
                },
            ]}
        >
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
                onRegionChangeComplete={(region) => {
                    setCurrentRegion(region);
                }}
            >
                <CurrentLocationMarker tracksViewChanges={false} />
                <ClusterMarkers currentRegion={currentRegion} />
            </MapView>
            <SafeAreaView style={styles.topWidgetContainer}>
                <SearchBar ref={searchBarRef}></SearchBar>
                <Pressable
                    style={[
                        styles.settingModalButton,
                        {
                            backgroundColor: currentColour.background,
                            borderColor: currentColour.shadow,
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate('SettingsModal');
                    }}
                >
                    <Icon name="cog" size={20} color={currentColour.primary} />
                </Pressable>
            </SafeAreaView>
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    topWidgetContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 12,
        paddingTop: 6,
        flexDirection: 'row',
    },
    settingModalButton: {
        width: 42,
        height: 42,
        borderWidth: 1,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
