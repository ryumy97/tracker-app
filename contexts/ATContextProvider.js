import React, { createContext, useState, useContext } from 'react';
import { getVersion } from '../services/ATService';

const ATContext = createContext();

export function useATContext() {
    const context = useContext(ATContext);
    if (!context) {
        throw new Error('useATContext should be used inside ATContextProvider');
    }

    return context;
}

export default function ATContextProvider({ children }) {
    const [version, setVersion] = useState('');

    async function fetchVersion() {
        return getVersion().then((version) => {
            setVersion(version);
        });
    }

    return (
        <ATContext.Provider
            value={{
                version,
                fetchVersion,
            }}
        >
            {children}
        </ATContext.Provider>
    );
}
