import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Supercluster from 'supercluster';
import { useLocation } from '../../contexts/LocationProvider';
import CurrentLocationMarker from './CurrentLocationMarker';
import SearchBar from './SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useATContext } from '../../contexts/ATContextProvider';
import { render } from 'react-dom';

export default function MapPage() {
    const { errorMsg, location, aspectRatio, width } = useLocation();
    const { stops } = useATContext();
    const [isMapReady, setIsMapReady] = useState(false);
    const [stopMarkers, setSetStopMarkers] = useState([]);
    const mapRef = useRef(null);
    const searchBarRef = useRef(null);

    const index = new Supercluster({ minZoom: 1, maxZoom: 16, extent: 512, radius: width * 0.045 });
    index.load(
        stops.map(({ stop_lon, stop_lat }) => {
            return {
                type: 'Feature',
                geometry: {
                    coordinates: [stop_lon, stop_lat],
                    type: 'Point',
                },
                properties: { point_count: 0 },
            };
        })
    );

    useEffect(() => {
        if (isMapReady && location && location.coords) {
            const {
                coords: { latitude, longitude },
            } = location;
            mapRef.current.animateToRegion(
                { latitude, longitude, latitudeDelta: 0.015, longitudeDelta: 0.001 * aspectRatio },
                500
            );
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
                onRegionChangeComplete={({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
                    const zoom = Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
                    const cluster = index.getClusters(
                        [
                            longitude - longitudeDelta,
                            latitude - latitudeDelta,
                            longitude + longitudeDelta,
                            latitude + latitudeDelta,
                        ],
                        zoom
                    );
                    setSetStopMarkers(cluster);
                }}
            >
                <CurrentLocationMarker tracksViewChanges={false} />

                {stopMarkers &&
                    stopMarkers.map(({ geometry: { coordinates }, id, properties: { cluster, point_count } }) => {
                        if (cluster) {
                            return (
                                <Marker
                                    key={id}
                                    style={styles.clusterMarker}
                                    coordinate={{
                                        latitude: coordinates[1],
                                        longitude: coordinates[0],
                                    }}
                                >
                                    <View style={styles.clusterView}>
                                        <Text style={styles.clusterText}>{point_count}</Text>
                                    </View>
                                </Marker>
                            );
                        }
                        return (
                            <Marker
                                key={id}
                                trackViewChanges={false}
                                anchor={{ x: 0.5, y: 0.5 }}
                                style={styles.stops_marker}
                                coordinate={{
                                    latitude: coordinates[1],
                                    longitude: coordinates[0],
                                }}
                            >
                                <View style={styles.stops_view}></View>
                            </Marker>
                        );
                    })}
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
    stops_marker: {
        zIndex: 1000,
    },
    stops_view: {
        justifyContent: 'center',
        backgroundColor: '#ff6700',
        width: 10,
        height: 10,
        borderRadius: 2.5,
        margin: 6,
    },
    clusterMarker: {
        zIndex: 1000,
    },
    clusterView: {
        justifyContent: 'center',
        backgroundColor: '#ff6700',
        width: 10,
        height: 10,
        borderRadius: 2.5,
        margin: 6,
    },
    clusterText: {
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        color: '#fff',
    },
});
