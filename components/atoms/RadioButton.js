import React from 'react';
import { View } from 'react-native';

export default function RadioButton({ isSelected, style, color }) {
    return (
        <View
            style={[
                {
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: color,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
        >
            {isSelected ? (
                <View
                    style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: color,
                    }}
                />
            ) : null}
        </View>
    );
}
