import React, { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useLocation } from '../../contexts/LocationProvider';
import CurrentLocationMarker from './CurrentLocationMarker';
import SearchBar from './SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClusterMarkers from './ClusterMarkers';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function MapPage() {
    const { errorMsg, location, aspectRatio } = useLocation();
    const [currentRegion, setCurrentRegion] = useState({});
    const [isMapReady, setIsMapReady] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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
        <View style={styles.container}>
            {errorMsg ? <Text>{errorMsg}</Text> : null}
            <Modal
                visible={modalVisible}
                transparent={true}
                statusBarTranslucent
                animationType="fade"
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}></Pressable>
                <View style={styles.modal}>
                    <View style={styles.card}>
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Icon name="times" size={20} color="#aaa"></Icon>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
                <Pressable style={styles.settingModalButton} onPress={() => setModalVisible(true)}>
                    <Icon name="cog" size={20} color="#ff6700" />
                </Pressable>
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
    topWidgetContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 12,
        paddingTop: 6,
        flexDirection: 'row',
    },
    settingModalButton: {
        backgroundColor: '#fff',
        width: 42,
        height: 42,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        padding: 20,
    },
    modalBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        height: 500,
        borderColor: '#ff6700',
        borderRadius: 12,
    },
    closeButton: {
        position: 'absolute',
        margin: 10,
        marginTop: 8,
        top: 0,
        right: 0,
    },
});
