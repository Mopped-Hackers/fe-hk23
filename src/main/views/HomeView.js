import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import config, {theme} from "../../config";
import Map, {Layer, Marker, Source} from "react-map-gl";
import * as turf from "@turf/turf";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import RenderCondition from "../../core/helpers/RenderCondition";


export default function HomeView() {

    const [marker,setMarker] = useState(null);
    const [searchedCards,setSearchedCards] = useState(null);
    const [missingSearched,setMissingSearched] = useState(null);
    const [all,setAll] = useState(null);
    const [heatmap, setHeatmap] = useState('none');
    const {map_css, sidebar_css} = styles();
    const layerPlacesSearch = {
        'id': 'places',
        'type': 'circle',
        'source': 'points',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-color': ['get','color'],
            'circle-stroke-color': 'black',
            'circle-stroke-width': 3,
            'circle-radius': 8
        }
    };
    const layerPlaces = {
        'id': 'places',
        'type': 'circle',
        'source': 'points',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-color': 'rgba(0,0,0,0.8)',
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-radius': 4
        }
    };

    const layerHeatmap = {
        'id': 'heatmap',
        'type': 'heatmap',
        'source': 'points',
        'layout': {
            'visibility': heatmap
        },
        'paint': {
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(29,178,24,0)',
                0.1, 'rgba(255,196,0,0.4)',
                1, 'rgba(255,61,2,0.7)',
            ],
            'heatmap-radius': 40,
        }
    };


    const heatmapShow = ()=>{
        if (heatmap === 'none'){
            setHeatmap('visible');
        }else{
            setHeatmap('none');
        }
    }
    const search = (lng,lat)=>{

        const data = {
            "type": "FeatureCollection",
            "features": [
                turf.circle([lng,lat], 1100, { steps: 50, units: "meters" })
            ]
        }

        axios.get(`http://vps.andrejvysny.sk:8000/geom/search?lon=${lng}&lat=${lat}&radius=1100`).then(r=>{

            setSearchedCards(r.data.points)
            setMissingSearched(r.data.missing)

            setMarker(
                <>
                    <Source id="my-data" type="geojson" data={{
                        "type": "FeatureCollection",
                        "features":r.data.points
                    }}>
                        <Layer{...layerPlacesSearch}/>
                    </Source>
                    <Source type="geojson" data={data}>
                        <Layer
                            id="data"
                            type="fill"
                            paint={{
                                "fill-color": "#088",
                                "fill-opacity": 0.4,
                            }}
                        />
                    </Source>
                    <Marker longitude={lng} latitude={lat}/>
                </>
            );
        })
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => search(position.coords.longitude,position.coords.latitude));


        axios.get("http://vps.andrejvysny.sk:8000/geom/all").then(r=>{


            setAll( r.data);
        })

        }, []);
    return (
        <>
            <div className="options">
                <button onClick={()=>heatmapShow()}>Heatmap</button>
            </div>
            <div css={map_css}>
                <Map
                    onClick={e=>search(e.lngLat.lng,e.lngLat.lat)}
                    mapStyle={config.mapbox.style}
                    mapboxAccessToken={config.mapbox.access_token}
                    initialViewState={{
                        longitude: 21.25808,
                        latitude: 48.71395,
                        zoom: 14
                    }}
                >
                    {marker}

                    <RenderCondition condition={all !== null}>
                        <Source id="all-data" type="geojson" data={{
                            "type": "FeatureCollection",
                            "features": all
                        }}>
                            <Layer{...layerHeatmap}/>
                            <Layer{...layerPlaces}/>
                        </Source>
                    </RenderCondition>
                </Map>
            </div>
            <div css={sidebar_css}>
                <Sidebar cards={searchedCards} missing={missingSearched}/>
            </div>
        </>
    );

}


function styles() {


    const map_css = css`
      width: 75vw;
      height: 100vh;
    `
    const sidebar_css = css`
      width: 25vw;
      border-left: 1px solid grey;
    `

    return {
        map_css,
        sidebar_css
    }
}