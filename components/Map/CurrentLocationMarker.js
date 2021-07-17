import React from 'react';
import { Circle, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useLocation } from '../../contexts/LocationProvider';

export default function CurrentLocationMarker() {
    const { location, heading } = useLocation();
    return (
        <>
            {location.coords ? (
                <>
                    <Marker
                        anchor={{ x: 0.5, y: 0.5 }}
                        style={style.marker}
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    >
                        <View style={style.container}>
                            <View style={style.circle}></View>
                            <View style={style.halo}></View>
                            {heading ? (
                                <View
                                    style={[
                                        style.heading,
                                        {
                                            transform: [
                                                {
                                                    rotate: `${heading}deg`,
                                                },
                                            ],
                                        },
                                    ]}
                                >
                                    <View style={style.headingArrow} />
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
        </>
    );
}

const markerColour = '#4285F4';

const style = StyleSheet.create({
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
        backgroundColor: markerColour,
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
        borderBottomColor: markerColour,
    },
});
