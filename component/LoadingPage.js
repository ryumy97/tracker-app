import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { AT_API_URL, AT_API_KEY } from "@env"

export default function LoadingView() {
    const [version, setVersion] = useState("");
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`${AT_API_URL}/v2/gtfs/versions`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': AT_API_KEY
            }
        })
        .then(res => res.json())
        .then(({status, response, error}) => {
            setVersion(response[0].version)
        })
        .catch(err => {
            console.log(err)
            setError(err.toString());
        })
    }, [])
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{version}</Text>
            <Text style={styles.text}>
                {error
                ? error
                : null}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#ff6700',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#fff"
    },
    text: {
        color: "#fff"
    }
});
  