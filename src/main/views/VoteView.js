import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import config from "../../config";
import {getData, routes} from "../routes";
import Map, {Layer, Marker, Source} from "react-map-gl";
import * as turf from "@turf/turf";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import RenderCondition from "../../core/helpers/RenderCondition";
import {Link} from "react-router-dom";


export default function VoteView() {

    const {map_css, sidebar_css} = styles();
    const [markers,setMarkers] = useState(null);
    const [data,setData] = useState(null)

    const [currentPoint, setCurrentPoint] = useState(null);

    useEffect(()=>{

        axios.get("http://vps.andrejvysny.sk:8000/geom/all?vote=1").then(r=>{


            console.log(r.data);
            let points = [];

            r.data.map((point,index)=>{
                points.push(<Marker key={index} longitude={point.geometry.coordinates[0]} latitude={point.geometry.coordinates[1]} color={"orange"} onClick={()=>click(point)}><span style={{borderRadius: '50%',border: "2px solid black",opacity: 0.8, width:25,height:25,cursor:"pointer", backgroundColor:'red', display:"block"}}></span></Marker>)
            });

            setMarkers(points);

        }).catch(e=>console.log(e))


    },[]);


    const click = point =>{
        setCurrentPoint(point);
        console.log(point);
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
                        zoom: 14
                    }}
                >
                    {markers}
                </Map>
            </div>
            <div css={sidebar_css}>
            <div className="content">
                <Link to={routes.home}>Back</Link>
                            <div className='in_fifteen_wrapper'>
                                <h2 className='in_fifteen'>In 15 minutes you will get here:</h2>
                            </div>

                    </div>
                <h1 className="text-center my-4">Voting!</h1>
                <RenderCondition condition={currentPoint !== null}>
                    <h1>{currentPoint?.properties.name}</h1>
                    <p>{currentPoint?.properties.addressline}</p>
                    <p>{currentPoint?.geometry.coordinates.toString()}</p>

                    <p>{currentPoint?.properties.info}</p>
                    <div className="voting_buttons">
                        <button className="yes btn-success btn">Yes!</button>
                        <button className="no btn-danger btn">No!</button>
                    </div>
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