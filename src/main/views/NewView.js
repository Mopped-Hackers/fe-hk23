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

    const [marker,setMarker] = useState(null);

    const [lng,setLng] = useState(null);
    const [lat,setLat] = useState(null);


    const [categories,setCategories] = useState([])

    useEffect(()=>{
        axios.get("http://vps.andrejvysny.sk:8000/geom/categories").then(r=>{
            setCategories(r.data);
        })
    },[]);

    const [manual,setManual] = useState(false);


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

        build.map(point=>{
            //axios.post()
        })

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
              r.data.points.map((point,index)=>{
                 return <Marker key={index} longitude={point.geometry.coordinates[0]} latitude={point.geometry.coordinates[1]} color={point.properties.color}/>
              })
            )
            console.log(r);
        })
    }

    const clear = ()=>{
        setBuild([]);
        setMarkers(null);
        setMarker(null);
        setLng(null);
        setLat(null);
        axios.get("http://vps.andrejvysny.sk:8000/ai/default-town").then(r=>{setScore(r.data);        });
    }

    const handleForm = e =>{
        e.preventDefault();
        if (manual&&lng&&lat){

            const obj = {
                "fid": "",
                "aminity": "x",
                "lat": 0,
                "lon": 0,
                "addressline": "x",
                "type": "x",
                "info": "{'x':'a'}"
            }
        }

        console.log(e.target);
    }

    const manualMarker = (lng,lat)=>{
        if (manual){
            setLng(lng);
            setLat(lat);
            setMarker(<Marker longitude={lng} latitude={lat}/>);
        }

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
                    onClick={e=>manualMarker(e.lngLat.lng,e.lngLat.lat)}
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
                    {marker}

                </Map>
            </div>
            <div css={sidebar_css}>

                <Nav/>

                <button className="btn btn-primary" onClick={()=>buildAction()}>Auto build</button>
                <button className="btn btn-primary" onClick={()=>{clear();setManual(m=>!m)}}>Manual build</button>
                <button className="btn btn-primary" onClick={()=>heatmapShow()}>Heatmap</button>

                <RenderCondition condition={manual}>

                    <form className="manual_form" onSubmit={e=>handleForm(e)}>


                        <input type="text" placeholder="Name" name="fid"/>

                        <select name="aminity">
                            {categories.map(cat=><option key={cat} value={cat}>{cat}</option>)}
                        </select>


                        <div>Lng: {lng}</div>
                        <div>Lat: {lat}</div>

                        <button className="btn btn-warning" onClick={e=>{e.preventDefault();clear()}}>Clear</button>
                        <button className="btn btn-success" type="submit">Save</button>

                    </form>
                </RenderCondition>

                <RenderCondition condition={build.length > 0 && !manual}>
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