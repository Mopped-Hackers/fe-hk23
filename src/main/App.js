import * as React from 'react';
import Map, {Source, Layer} from 'react-map-gl';
import config from "../config";


import * as turf from "@turf/turf";

// change to see effect
let lon = -122.45, lat = 37.78



const geojson = {
    type: 'FeatureCollection',
    features: [
        turf.circle([lon, lat], 100,  { steps: 50, units: "meters" }),
        turf.circle([lon-4, lat+12], 1300,  { steps: 50, units: "meters" }),
        turf.circle([lon+3, lat], 100,  { steps: 50, units: "meters" }),
        turf.circle([lon-1, lat], 100,  { steps: 50, units: "meters" }),
    ]
};

const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 200,
        'circle-color': '#007cbf'
    }
};

export default function App() {
    const [viewport, setViewport] = React.useState();
    return (
        <Map initialViewState={{
            longitude: -122.45,
            latitude: 37.78,
            zoom: 14
        }}
             mapStyle={config.mapbox.style}
             mapboxAccessToken={config.mapbox.access_token}
        >

            <Source id="my-data" type="geojson" data={geojson}>
                <Layer
                    {...layerStyle}
                />
            </Source>

            <Source id="my-data" type="geojson" data={geojson}>
                <Layer
                    id="data"
                    type="fill"
                    paint={{
                        "fill-color": "#088",
                        "fill-opacity": 0.4,
                    }}
                />
            </Source>

        </Map>
    );
}
