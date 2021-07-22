import axios from 'axios';

import { AT_API_URL, AT_API_KEY } from '@env';

export async function getVersion() {
    const version = await axios
        .get(`${AT_API_URL}/v2/gtfs/versions`, {
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

/*
Example return
Object {
  "direction": null,
  "location_type": 0,
  "parent_station": null,
  "position": null,
  "stop_city": null,
  "stop_code": "97",
  "stop_country": null,
  "stop_desc": null,
  "stop_id": "0097-20210715111819_v98.7",
  "stop_lat": -37.06429,
  "stop_lon": 174.94611,
  "stop_name": "Papakura Train Station",
  "stop_postcode": null,
  "stop_region": null,
  "stop_street": null,
  "stop_timezone": null,
  "stop_url": null,
  "the_geom": "0101000020E6100000658D7A8846DE6540DCBA9BA73A8842C0",
  "wheelchair_boarding": null,
  "zone_id": "merged_9",
}
*/
export async function getStops() {
    const stops = await axios
        .get(`${AT_API_URL}/v2/gtfs/stops`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': AT_API_KEY,
            },
        })
        .then(({ data: { response } }) => {
            return response;
        });

    return stops;
}
