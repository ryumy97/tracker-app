import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../contexts/ThemeProvider';

const SearchBar = forwardRef((props, ref) => {
    const { currentColour } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const TextInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        blur: () => {
            TextInputRef.current.blur();
        },
    }));

    return (
        <Pressable
            style={[
                styles.container,
                {
                    backgroundColor: currentColour.background,
                    borderColor: currentColour.shadow,
                },
            ]}
            onPress={() => {
                TextInputRef.current.focus();
            }}
        >
            <Icon name="search" size={16} color={currentColour.primary} style={styles.searchIcon} />
            <TextInput
                ref={TextInputRef}
                style={styles.input}
                placeholder="Search Routes, Bus stops, etc"
                placeholderTextColor={currentColour.shadow}
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
                    color={currentColour.primary}
                    onPress={() => {
                        TextInputRef.current.clear();
                        TextInputRef.current.blur();
                    }}
                ></Icon>
            ) : null}
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 42,
        padding: 12,
        borderWidth: 1,
        borderRadius: 21,
        justifyContent: 'flex-start',
        flexGrow: 1,
        marginEnd: 6,
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

export default SearchBar;
