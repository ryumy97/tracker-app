import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const TextInputRef = useRef(null);

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                TextInputRef.current.focus();
            }}
        >
            <Icon name="search" size={16} color="#ff6700" style={styles.searchIcon} />
            <TextInput
                ref={TextInputRef}
                style={styles.input}
                placeholder="Search Routes, Bus stops, etc"
                onFocus={() => {
                    setIsFocused(true);
                }}
                onBlur={() => {
                    setIsFocused(false);
                }}
            />
            {isFocused ? (
                <Icon
                    style={styles.remove}
                    name="times-circle"
                    light
                    size={16}
                    color="#ff6700"
                    onPress={() => {
                        TextInputRef.current.clear();
                        TextInputRef.current.blur();
                    }}
                ></Icon>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 42,
        backgroundColor: '#fff',
        margin: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 21,
        justifyContent: 'flex-start',
    },
    searchIcon: {
        marginEnd: 5,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 0,
    },
    input: {
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 1,
    },
    remove: {
        marginStart: 5,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 0,
    },
});
