import React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

export default function ModalCard({ children, onPressBackground }) {
    return (
        <View style={styles.modal}>
            <Pressable style={styles.modalBackground} onPress={onPressBackground}></Pressable>
            <Animated.View style={styles.card}>
                <View style={styles.cardHeader}></View>
                {children}
            </Animated.View>
        </View>
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
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        height: 'auto',
        borderColor: '#ff6700',
        borderRadius: 6,
    },
    cardHeader: {
        height: 24,
        width: '100%',
        backgroundColor: '#ff6700',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomColor: '#12154c',
    },
});
