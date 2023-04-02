import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import config, {theme} from "../../config";
import Map, {Layer, Marker, Source} from "react-map-gl";
import * as turf from "@turf/turf";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import RenderCondition from "../../core/helpers/RenderCondition";
import {useDataProvider} from "../../core/providers/DataProvider";


export default function NewView() {

    const [all,setAll] = useState(null);
    const [markers,setMarkers] = useState(null);
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
            'circle-stroke-width': 1,
            'circle-radius': 6,
            'circle-opacity': 0.5,
        }
    };

    const {setScore} = useDataProvider();

    useEffect(()=>{

        axios.get(`http://vps.andrejvysny.sk:8000/geom/all`).then(r=>{

            setAll(
                <>
                    <Source id="my-data" type="geojson" data={{
                        "type": "FeatureCollection",
                        "features":r.data
                    }}>
                        <Layer{...layerPlacesSearch}/>
                    </Source>
                </>
            );
        })

    },[]);

    const build=()=>{

        axios.post("http://vps.andrejvysny.sk:8000/ai/predict",{
            "aminity" : [
                {
                    "name" : "School",
                    "count" : 2
                },
                {
                    "name" : "Hospital",
                    "count" : 2
                },
                {
                    "name" : "Drug store",
                    "count" : 2
                }
            ],
            "radius" : 11
        }).then(r=>{

            console.log(r);
            setScore(r.data?.score);

            setMarkers(
              r.data.points.map(point=>{
                 return <Marker longitude={point.geometry.coordinates[0]} latitude={point.geometry.coordinates[1]} color={point.properties.color}/>
              })
            )
            console.log(r);
        })
    }

    return (
        <>
            
            <div css={map_css}>
                <Map
                    mapStyle={config.mapbox.style}
                    mapboxAccessToken={config.mapbox.access_token}
                    initialViewState={{
                        longitude: 21.25808,
                        latitude: 48.71395,
                        zoom: 14,
                        pitch: 45
                    }}
                >
                    {all}
                    {markers}

                </Map>
            </div>
            <div css={sidebar_css}>

                <button className="btn btn-primary" onClick={()=>build()}>Build</button>
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