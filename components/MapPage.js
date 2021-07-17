import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapPage() {
    const [location, setLocation] = useState({});
    const [heading, setHeading] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [status, setStatus] = useState(true);
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
                setStatus(false);
                return;
            }

            setStatus(true);
        })();
    }, []);

    useEffect(() => {
        if (status) {
            const positionWatch = Location.watchPositionAsync({}, (location) => {
                setLocation(location);
            });

            return () => positionWatch?.remove();
        }
    }, [status]);

    useEffect(() => {
        if (status && location) {
            const headingWatch = Location.watchHeadingAsync((heading) => {
                const { trueHeading } = heading;
                if (trueHeading !== -1) {
                    setHeading(trueHeading);
                }
            });

            return () => headingWatch?.remove();
        }
    }, [status]);

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
                {location.coords ? (
                    <>
                        <Marker
                            anchor={{ x: 0.5, y: 0.5 }}
                            style={currentLocationStyle.marker}
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                        >
                            <View style={currentLocationStyle.container}>
                                <View style={currentLocationStyle.circle}></View>
                                <View style={currentLocationStyle.halo}></View>
                                {heading ? (
                                    <View
                                        style={[
                                            currentLocationStyle.heading,
                                            {
                                                transform: [
                                                    {
                                                        rotate: `${heading}deg`,
                                                    },
                                                ],
                                            },
                                        ]}
                                    >
                                        <View style={currentLocationStyle.headingArrow} />
                                    </View>
                                ) : null}
                            </View>
                        </Marker>
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
                    </>
                ) : null}
            </MapView>
        </View>
    );
}

const colorOfmyLocationMapMarker = '#4285F4';

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

const width = 10;
const height = 10;

const currentLocationStyle = StyleSheet.create({
    marker: {
        zIndex: 9999,
    },
    container: {
        width: 25,
        height: 25,
    },
    halo: {
        position: 'absolute',
        width: 15,
        height: 15,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 7.5,
        top: 5,
        left: 5,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    circle: {
        justifyContent: 'center',
        backgroundColor: colorOfmyLocationMapMarker,
        width: 13,
        height: 13,
        borderRadius: 6.5,
        margin: 6,
    },
    heading: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 25,
        height: 25,
        alignItems: 'center',
    },
    headingArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 4 * 0.75,
        borderBottomWidth: 4,
        borderLeftWidth: 4 * 0.75,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: colorOfmyLocationMapMarker,
    },
});
