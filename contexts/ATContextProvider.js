import React, { createContext, useState, useContext, useEffect } from 'react';
import { getStops, getVersion } from '../services/ATService';

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
    const [stops, setStops] = useState([]);

    async function fetchVersion() {
        const version = await getVersion();
        setVersion(version);
        return version;
    }

    async function fetchStops() {
        const stops = await getStops();
        setStops(stops);
        return stops;
    }

    return (
        <ATContext.Provider
            value={{
                version,
                fetchVersion,
                stops,
                fetchStops,
            }}
        >
            {children}
        </ATContext.Provider>
    );
}
