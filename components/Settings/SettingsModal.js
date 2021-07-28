import React from 'react';
import { Animated, Easing, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react/cjs/react.development';
import { useLocation } from '../../contexts/LocationProvider';

export default function SettingsModal(props) {
    const { width } = useLocation();
    const transformAnimation = new Animated.Value(0);
    const translateScale = transformAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -width],
    });

    const transformStyle = {
        transform: [{ translateX: translateScale }],
    };

    return (
        <Modal {...props}>
            <View style={styles.modal}>
                <Pressable style={styles.modalBackground} onPress={props.handlePressClose}></Pressable>
                <Animated.View style={[styles.card, transformStyle]}>
                    <View
                        style={[
                            {
                                height: 24,
                                width: '100%',
                                backgroundColor: '#ff6700',
                                borderTopLeftRadius: 6,
                                borderTopRightRadius: 6,
                                borderBottomColor: '#12154c',
                            },
                        ]}
                    ></View>
                    <View>
                        <FlatList
                            data={[
                                { key: 'Change Colours', name: 'palette', animatedValue: new Animated.Value(0) },
                                { key: 'About', name: 'address-card', animatedValue: new Animated.Value(0) },
                            ]}
                            renderItem={({ item: { key, name, animatedValue } }) => {
                                const opacityScale = animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)'],
                                });
                                const animatedScaleStyle = {
                                    backgroundColor: opacityScale,
                                };
                                return (
                                    <Pressable
                                        onPressIn={() => {
                                            Animated.timing(animatedValue, {
                                                toValue: 1,
                                                duration: 150,
                                                easing: Easing.linear,
                                                useNativeDriver: false,
                                            }).start();
                                        }}
                                        onPressOut={() => {
                                            Animated.timing(animatedValue, {
                                                toValue: 0,
                                                duration: 100,
                                                easing: Easing.linear,
                                                useNativeDriver: false,
                                            }).start();

                                            Animated.timing(transformAnimation, {
                                                toValue: 1,
                                                duration: 150,
                                                easing: Easing.linear,
                                                useNativeDriver: false,
                                            }).start();
                                        }}
                                    >
                                        <Animated.View
                                            style={[
                                                {
                                                    paddingTop: 16,
                                                    paddingBottom: 12,
                                                    flexDirection: 'row',
                                                },
                                                animatedScaleStyle,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    {
                                                        flexBasis: 48,
                                                        flexShrink: 1,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    },
                                                ]}
                                            >
                                                <Icon name={name} size={20} color="#ff6700"></Icon>
                                            </View>
                                            <Text
                                                style={[
                                                    {
                                                        flexBasis: 24,
                                                        flexShrink: 1,
                                                        flexGrow: 1,
                                                    },
                                                ]}
                                            >
                                                {key}
                                            </Text>
                                        </Animated.View>
                                    </Pressable>
                                );
                            }}
                        ></FlatList>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
        height: 'auto',
        borderColor: '#ff6700',
        borderRadius: 6,
    },
    closeButton: {
        position: 'absolute',
        margin: 10,
        marginTop: 8,
        top: 0,
        right: 0,
    },
});
