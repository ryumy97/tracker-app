import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeProvider';

export default function ModalCard({ children, onPressBackground }) {
    const { currentColour } = useTheme();
    return (
        <View style={styles.modal}>
            <Pressable style={styles.modalBackground} onPress={onPressBackground}></Pressable>
            <View
                style={[
                    styles.card,
                    {
                        borderColor: currentColour.primary,
                        backgroundColor: currentColour.background,
                    },
                ]}
            >
                <View
                    style={[
                        styles.cardHeader,
                        {
                            backgroundColor: currentColour.primary,
                            borderBottomColor: currentColour.shadow,
                        },
                    ]}
                ></View>
                {children}
            </View>
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
        width: '100%',
        height: 'auto',
        borderRadius: 6,
    },
    cardHeader: {
        height: 24,
        width: '100%',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
});
