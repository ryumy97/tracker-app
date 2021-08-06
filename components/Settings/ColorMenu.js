import React from 'react';
import { Text } from 'react-native';
import ModalCard from '../atoms/ModalCard';

export default function ColorMenu({ navigation }) {
    return (
        <ModalCard navigation={navigation}>
            <Text>Color</Text>
        </ModalCard>
    );
}
