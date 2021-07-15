import { AT_API_URL, AT_API_KEY } from '@env';

export async function getVersion() {
    console.log(AT_API_URL, AT_API_KEY)
    const version = await fetch(`${AT_API_URL}/v2/gtfs/versions`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': AT_API_KEY,
        },
    })
        .then((res) => res.json())
        .then(({ response }) => {
            return response[0].version;
        });
    console.log(version);
    return version;
}
