import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export function useLocation() {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation should be used inside LocationProvider');
    }

    return context;
}

export default function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    const [heading, setHeading] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setStatus(false);
                return;
            }

            setStatus(true);
        })();
    }, []);

    useEffect(() => {
        if (status) {
            const positionWatch = Location.watchPositionAsync({}, (location) => {
                setLocation(location);
            });

            if (positionWatch && positionWatch.remove) {
                return () => positionWatch?.remove();
            }
        }
    }, [status]);

    useEffect(() => {
        if (status && location) {
            const headingWatch = Location.watchHeadingAsync((heading) => {
                const { trueHeading } = heading;
                if (trueHeading !== -1) {
                    setHeading(trueHeading);
                }
            });

            if (headingWatch && headingWatch.remove) {
                return () => headingWatch?.remove();
            }
        }
    }, [status]);

    return (
        <LocationContext.Provider
            value={{
                location,
                heading,
                errorMsg,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}
