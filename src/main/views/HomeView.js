import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import config, {theme} from "../../config";
import {getData} from "../routes";
import Map, {Layer, Marker, Source} from "react-map-gl";
import * as turf from "@turf/turf";
import Sidebar from "../components/Sidebar";
import RenderCondition from "../../core/helpers/RenderCondition";
import axios from "axios";
import Card from "../components/Card";


export default function HomeView() {

    const [marker,setMarker] = useState(null);
    const [searchedCards,setSearchedCards] = useState(null);
    const [missingSearched,setMissingSearched] = useState(null);
    const [heatmap, setHeatmap] = useState('none');
    const {map_css, sidebar_css} = styles();

    const layerPlaces = {
        'id': 'places',
        'type': 'circle',
        'source': 'points',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-color': 'rgb(0,0,0)',
            'circle-stroke-color': 'white',
            'circle-stroke-width': 3,
            'circle-radius': 8
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
    const click = e=>{



        const data = {
            "type": "FeatureCollection",
            "features": [
                turf.circle([e.lngLat.lng,e.lngLat.lat], 1300, { steps: 50, units: "meters" })
            ]
        }

        axios.get(`http://vps.andrejvysny.sk:8000/geom/search?lon=${e.lngLat.lng}&lat=${e.lngLat.lat}&radius=1300`).then(r=>{

            setSearchedCards(r.data.points)
            setMissingSearched(r.data.missing)

            setMarker(
                <>
                    <Source id="my-data" type="geojson" data={{
                        "type": "FeatureCollection",
                        "features":r.data.points
                    }}>
                        <Layer{...layerHeatmap}/>
                        <Layer{...layerPlaces}/>
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
                    <Marker longitude={e.lngLat.lng} latitude={e.lngLat.lat}/>
                </>
            );
        })
        

        
    }


    return (
        <>
            <div className="options">
                <button onClick={()=>heatmapShow()}>Heatmap</button>
            </div>
            <div css={map_css}>
                <Map
                    onClick={e=>click(e)}
                    mapStyle={config.mapbox.style}
                    mapboxAccessToken={config.mapbox.access_token}
                    initialViewState={{
                        longitude: 21.25808,
                        latitude: 48.71395,
                        zoom: 14
                    }}
                    interactive={true}
                >

                    {marker}

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