import React from 'react';
import { Animated } from 'react-native';
import AnimatedPressableList from '../atoms/AnimatedPressableList';
import ModalCard from '../atoms/ModalCard';

export default function SettingsMenu({ navigation }) {
    return (
        <ModalCard navigation={navigation}>
            <AnimatedPressableList
                data={[
                    {
                        key: 'color',
                        text: 'Change Colours',
                        iconName: 'palette',
                        navigationAction: 'ColorMenu',
                        animatedValue: new Animated.Value(0),
                    },
                    {
                        key: 'about',
                        text: 'About',
                        iconName: 'address-card',
                        navigationAction: 'AboutMenu',
                        animatedValue: new Animated.Value(0),
                    },
                ]}
                scrollEnabled
                navigation={navigation}
            ></AnimatedPressableList>
        </ModalCard>
    );
}
