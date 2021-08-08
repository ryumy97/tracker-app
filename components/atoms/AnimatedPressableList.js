import React, { useRef } from 'react';
import { Animated, Easing, FlatList, Pressable, View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../contexts/ThemeProvider';
import RadioButton from './RadioButton';

export default function AnimatedPressableList({ data, scrollEnabled, disabled }) {
    const { currentColour } = useTheme();
    const animationRef = useRef({});

    return (
        <FlatList
            ItemSeparatorComponent={() => (
                <View
                    style={[
                        styles.seperator,
                        {
                            borderBottomColor: currentColour.shadow,
                        },
                    ]}
                ></View>
            )}
            scrollEnabled={scrollEnabled}
            data={data}
            renderItem={({ item: { key, text, iconName, action, type, isSelected } }) => {
                !animationRef.current[key] && (animationRef.current[key] = new Animated.Value(0));

                const backgroundScale = animationRef.current[key].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)'],
                });
                const animatedScaleStyle = {
                    backgroundColor: backgroundScale,
                };

                return (
                    <Pressable
                        key={key}
                        disabled={disabled}
                        onPressIn={() => {
                            Animated.timing(animationRef.current[key], {
                                toValue: 1,
                                duration: 150,
                                easing: Easing.linear,
                                useNativeDriver: false,
                            }).start();
                        }}
                        onPressOut={() => {
                            Animated.timing(animationRef.current[key], {
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
                                    <Icon name={iconName} size={20} color={currentColour.primary}></Icon>
                                </View>
                            )}
                            {type === 'radio' && (
                                <View style={styles.icon}>
                                    <RadioButton color={currentColour.primary} isSelected={isSelected}></RadioButton>
                                </View>
                            )}
                            <Text
                                style={[
                                    styles.text,
                                    !(iconName || type) && styles.textPadding,
                                    {
                                        color: currentColour.text,
                                    },
                                ]}
                            >
                                {text}
                            </Text>
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
    darkBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
    },
    seperator: {
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
