import React from 'react';
import AnimatedPressableList from '../atoms/AnimatedPressableList';
import ModalCard from '../atoms/ModalCard';

export default function ColorMenu({ navigation }) {
    return (
        <ModalCard
            onPressBackground={() => {
                navigation.navigate('Map');
            }}
        >
            <AnimatedPressableList
                data={[
                    {
                        key: 'default',
                        text: 'Default Color',
                        // iconName: 'palette',
                        action: () => {
                            alert('hi');
                        },
                        isSelected: true,
                        type: 'radio',
                    },
                ]}
                scrollEnabled
            ></AnimatedPressableList>
        </ModalCard>
    );
}
