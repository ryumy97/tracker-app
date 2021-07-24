import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { useATContext } from '../../contexts/ATContextProvider';
import { useLocation } from '../../contexts/LocationProvider';
import Supercluster from 'supercluster';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
export default function ClusterMarkers({ currentRegion }) {
    const { width } = useLocation();
    const { stops } = useATContext();
    const [stopMarkers, setSetStopMarkers] = useState([]);
    const [ready, setReady] = useState(false);

    const [zoomInCluster, setZoomInCluster] = useState(
        new Supercluster({ minZoom: 15, maxZoom: 16, extent: 256, radius: width * 0.045 })
    );
    const [zoomOutCluster, setZoomOutCluster] = useState(
        new Supercluster({ minZoom: 6, maxZoom: 14, extent: 80, radius: width * 0.045 })
    );

    function stopsToGeoJson(stops) {
        return stops.map(({ stop_lon, stop_lat }) => {
            return {
                type: 'Feature',
                geometry: {
                    coordinates: [stop_lon, stop_lat],
                    type: 'Point',
                },
                properties: { point_count: 0 },
            };
        });
    }

    useEffect(() => {
        if (stops.length !== 0) {
            setZoomInCluster(zoomInCluster.load(stopsToGeoJson(stops)));
            setZoomOutCluster(zoomOutCluster.load(stopsToGeoJson(stops)));
            setReady(true);
        }
    }, [stops]);

    useEffect(() => {
        if (currentRegion.latitude && ready && zoomOutCluster.trees.length !== 0 && zoomInCluster.trees.length !== 0) {
            const { latitude, longitude, latitudeDelta, longitudeDelta } = currentRegion;

            const zoom = Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
            let cluster = [];
            const bbox = [
                longitude - longitudeDelta,
                latitude - latitudeDelta,
                longitude + longitudeDelta,
                latitude + latitudeDelta,
            ];
            if (zoom > 14) {
                cluster = zoomInCluster.getClusters(bbox, parseInt(zoom));
            } else {
                cluster = zoomOutCluster.getClusters(bbox, parseInt(zoom));
            }
            setSetStopMarkers(cluster);
        }
    }, [currentRegion, ready]);

    if (stopMarkers.length !== 0) {
        return stopMarkers.map(
            ({ geometry: { coordinates }, id, properties: { cluster, cluster_id, point_count } }, index) => {
                if (cluster) {
                    return (
                        <Marker
                            key={`${id} + ${cluster_id}`}
                            style={styles.clusterMarker}
                            coordinate={{
                                latitude: coordinates[1],
                                longitude: coordinates[0],
                            }}
                            tracksViewChanges={false}
                        >
                            <View style={styles.clusterView}>
                                <Text style={styles.clusterText}>{point_count}</Text>
                            </View>
                        </Marker>
                    );
                }
                return (
                    <Marker
                        key={`${id} + ${index}`}
                        trackViewChanges={false}
                        anchor={{ x: 0.5, y: 0.5 }}
                        style={styles.stopsMarker}
                        coordinate={{
                            latitude: coordinates[1],
                            longitude: coordinates[0],
                        }}
                        tracksViewChanges={false}
                    >
                        <View style={styles.stopsView}></View>
                    </Marker>
                );
            }
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    stopsMarker: {
        zIndex: 1000,
    },
    stopsView: {
        justifyContent: 'center',
        backgroundColor: '#12154c',
        width: 23,
        height: 23,
        borderRadius: 5,
    },
    clusterMarker: {
        zIndex: 1000,
    },
    clusterView: {
        justifyContent: 'center',
        backgroundColor: '#12154c',
        width: 20,
        height: 20,
        borderRadius: 5,
        padding: 1,
    },
    clusterText: {
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
    },
});
