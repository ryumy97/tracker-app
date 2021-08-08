import React from 'react';
import { Animated, Easing, FlatList, Pressable, View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import RadioButton from './RadioButton';

export default function AnimatedPressableList({ data, scrollEnabled, disabled }) {
    return (
        <FlatList
            ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
            scrollEnabled={scrollEnabled}
            data={data}
            renderItem={({ item: { key, text, iconName, action, type, isSelected } }) => {
                const animatedValue = new Animated.Value(0);
                const opacityScale = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)'],
                });
                const animatedScaleStyle = {
                    backgroundColor: opacityScale,
                };
                return (
                    <Pressable
                        key={key}
                        disabled={disabled}
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
                            action();
                        }}
                    >
                        <Animated.View style={[styles.row, animatedScaleStyle]}>
                            {iconName && (
                                <View style={styles.icon}>
                                    <Icon name={iconName} size={20} color="#ff6700"></Icon>
                                </View>
                            )}
                            {type === 'radio' && (
                                <View style={styles.icon}>
                                    <RadioButton color="#ff6700" isSelected={isSelected}></RadioButton>
                                </View>
                            )}
                            <Text style={[styles.text, !(iconName || type) && styles.textPadding]}>{text}</Text>
                        </Animated.View>
                    </Pressable>
                );
            }}
        ></FlatList>
    );
}

const styles = StyleSheet.create({
    row: {
        paddingTop: 16,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    seperator: {
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
    },
    icon: {
        flexBasis: 48,
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flexBasis: 24,
        flexShrink: 1,
        flexGrow: 1,
    },
    textPadding: {
        paddingStart: 16,
    },
});
