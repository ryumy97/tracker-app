import React from 'react';
import { Animated, Easing, FlatList, Pressable, View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AnimatedPressableList(props) {
    const { data, scrollEnabled, disabled, navigation } = props;
    return (
        <FlatList
            scrollEnabled={scrollEnabled}
            data={data}
            renderItem={({ item: { key, text, iconName, navigationAction, animatedValue } }) => {
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

                            navigation.navigate(navigationAction);
                        }}
                    >
                        <Animated.View style={[styles.row, animatedScaleStyle]}>
                            <View style={styles.icon}>
                                <Icon name={iconName} size={20} color="#ff6700"></Icon>
                            </View>
                            <Text style={styles.text}>{text}</Text>
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
});
