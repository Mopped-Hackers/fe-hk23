import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import config, {theme} from "../../config";
import Map, {Layer, Marker, Source} from "react-map-gl";
import * as turf from "@turf/turf";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import RenderCondition from "../../core/helpers/RenderCondition";
import Nav from "../components/Nav";


export default function HomeView() {

    const [marker,setMarker] = useState(null);
    const [searchedCards,setSearchedCards] = useState(null);
    const [missingSearched,setMissingSearched] = useState(null);
    const [all,setAll] = useState(null);
    const {map_css, sidebar_css} = styles();

    const [filter, setFilter] = useState([]);

    const filterCategory = (category)=>{
        if (filter.includes(category)){
            setFilter(f=>f.filter(o=>o!==category));
        }else{
            setFilter(f=>[...f,category]);
        }
    }


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
            'circle-stroke-width': 2,
            'circle-radius': 6
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

    const search = (lng,lat)=>{

        const data = {
            "type": "FeatureCollection",
            "features": [
                turf.circle([lng,lat], 1100, { steps: 50, units: "meters" })
            ]
        }

        var str = '';
        for(var i = 0; i < filter.length; i++) {
            str += '&category='+filter[i];
            console.log(str);
        }


        console.log(str);

        axios.get(`http://vps.andrejvysny.sk:8000/geom/search?lon=${lng}&lat=${lat}&radius=1100${str}`).then(r=>{

            setSearchedCards(r.data.points)
            setMissingSearched(r.data.missing)

            console.log(r.data);

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

        }, []);
    return (
        <>
            <div style={{fontWeight:"light",position:"fixed", bottom: 20,left:20,fontSize:18,zIndex:1000, padding:10, borderRadius: 10,backgroundColor: "grey",color: "black"}}>
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
                    onClick={e=>search(e.lngLat.lng,e.lngLat.lat)}
                    mapStyle={config.mapbox.style}
                    mapboxAccessToken={config.mapbox.access_token}
                    initialViewState={{
                        longitude: 21.25808,
                        latitude: 48.71395,
                        zoom: 14,
                        pitch: 45
                    }}
                >

                    {marker}


                </Map>
            </div>
            <div css={sidebar_css}>
                <Nav filter={filter} setFilter={filterCategory}/>
                <Sidebar cards={searchedCards} missing={missingSearched} setCards={setSearchedCards} setMissing={setMissingSearched}/>
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