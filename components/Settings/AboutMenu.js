import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function AboutMenu({ navigation }) {
    return (
        <View style={styles.modal}>
            <Pressable
                style={styles.modalBackground}
                onPress={() => {
                    navigation.navigate('Map');
                }}
            ></Pressable>
            <Text>About</Text>
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
});
