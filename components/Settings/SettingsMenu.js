import React from 'react';
import AnimatedPressableList from '../atoms/AnimatedPressableList';
import ModalCard from '../atoms/ModalCard';

export default function SettingsMenu({ navigation }) {
    return (
        <ModalCard
            onPressBackground={() => {
                navigation.goBack();
            }}
        >
            <AnimatedPressableList
                data={[
                    {
                        key: 'color',
                        text: 'Change Colours',
                        iconName: 'palette',
                        action: () => {
                            navigation.navigate('ColorMenu');
                        },
                    },
                    {
                        key: 'about',
                        text: 'About',
                        iconName: 'address-card',
                        action: () => {
                            navigation.navigate('AboutMenu');
                        },
                    },
                ]}
                scrollEnabled
            ></AnimatedPressableList>
        </ModalCard>
    );
}
