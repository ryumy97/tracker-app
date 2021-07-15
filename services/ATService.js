import axios from 'axios';

import { AT_API_URL, AT_API_KEY } from '@env';

export async function getVersion() {
    const version = await axios.get(`${AT_API_URL}/v2/gtfs/versions`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': AT_API_KEY,
        },
    })
    .then(({ data: { response } }) => {
        return response[0].version;
    });

    return version;
}
