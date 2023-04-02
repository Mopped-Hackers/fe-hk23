import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import config, {theme} from "../../config";
import Map, {Layer, Marker, Source} from "react-map-gl";
import * as turf from "@turf/turf";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import RenderCondition from "../../core/helpers/RenderCondition";
import {useDataProvider} from "../../core/providers/DataProvider";
import Nav from "../components/Nav";


export default function NewView() {

    const [all,setAll] = useState(null);
    const [markers,setMarkers] = useState(null);
    const {map_css, sidebar_css} = styles();
    const [heatmap, setHeatmap] = useState('none');
    const [build,setBuild] = useState([]);

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

    const {setScore} = useDataProvider();

    useEffect(()=>{

        axios.get(`http://vps.andrejvysny.sk:8000/geom/all`).then(r=>{

            setAll(
                <>
                    <Source id="my-data" type="geojson" data={{
                        "type": "FeatureCollection",
                        "features":r.data
                    }}>
                        <Layer {...layerHeatmap}/>
                        <Layer{...layerPlacesSearch}/>

                    </Source>
                </>
            );
        })

    },[heatmap]);

    const saveBuild = ()=>{
        axios
    }
    const buildAction=()=>{

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
            setBuild(r.data.points);
            setMarkers(
              r.data.points.map(point=>{
                 return <Marker longitude={point.geometry.coordinates[0]} latitude={point.geometry.coordinates[1]} color={point.properties.color}/>
              })
            )
            console.log(r);
        })
    }

    const clear = ()=>{
        setBuild([]);
        setMarkers(null);
        axios.get("http://vps.andrejvysny.sk:8000/ai/default-town").then(r=>{setScore(r.data);        });
    }

    return (
        <>
            <div style={{fontWeight:"bold",position:"fixed", bottom: 20,left:20,fontSize:18,zIndex:1000, padding:10, borderRadius: 10,backgroundColor: "grey",color: "black"}}>
                <div style={{color:"red"}}>Culture</div>
                <div style={{color:"white"}}>Drug store</div>
                <div style={{color:"green"}}>Green place</div>
                <div style={{color:"yellow"}}>Hospital</div>
                <div style={{color:"purple"}}>Job</div>
                <div style={{color:"blue"}}>School</div>
                <div style={{color:"orange"}}>Shop</div>
                <div style={{color:"pink"}}>Sport</div>
                <div style={{color:"black"}}>Transport</div>
            </div>
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

                <Nav/>

                <button className="btn btn-primary" onClick={()=>buildAction()}>Build</button>
                <button className="btn btn-primary" onClick={()=>heatmapShow()}>Heatmap</button>


                <RenderCondition condition={build.length > 0}>
                    <button className="btn btn-warning" onClick={()=>clear()}>Clear</button>
                    <button className="btn btn-success" onClick={()=>saveBuild()}>Save</button>
                </RenderCondition>
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