import React from 'react';
import { useTheme } from '../../contexts/ThemeProvider';
import AnimatedPressableList from '../atoms/AnimatedPressableList';
import ModalCard from '../atoms/ModalCard';

export default function ColorMenu({ navigation }) {
    const { getKeys, setCurrentTheme, colours, isCurrentTheme } = useTheme();
    const keys = getKeys();
    return (
        <ModalCard
            onPressBackground={() => {
                navigation.navigate('Map');
            }}
        >
            <AnimatedPressableList
                data={keys.map((key, index) => {
                    const { name } = colours[key];
                    return {
                        key: key,
                        text: name,
                        action: () => {
                            setCurrentTheme(key);
                        },
                        isSelected: isCurrentTheme(key),
                        type: 'radio',
                    };
                })}
                scrollEnabled
            ></AnimatedPressableList>
        </ModalCard>
    );
}
