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
import Arrow from "/src/assets/icons/arrow.svg"
import Thumb from "/src/assets/icons/thumb.svg"
import Nav from "../components/Nav";



export default function VoteView() {

    const {map_css, sidebar_css} = styles();
    const [markers,setMarkers] = useState(null);
    const [data,setData] = useState(null)

    const [yes,setYes] =useState(0);
    const [no,setNo] =useState(0);

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

        if (point?.properties?.fid){
            axios.get("http://vps.andrejvysny.sk:8000/geom/score/" + point.properties.fid).then(r=>{
                console.log(r);
            });
        }

        setCurrentPoint(point);
        console.log(point);
    }




    return (
        <>
            <div  css={map_css}>
                <Map
                    mapStyle={config.mapbox.style}
                    mapboxAccessToken={config.mapbox.access_token}
                    initialViewState={{
                        longitude: 21.25808,
                        latitude: 48.71395,
                        zoom: 13
                    }}
                >
                    {markers}
                </Map>
            </div>
            <div className="vote_bar">
                <Nav/>
            <div className="content">


                <div className='tab_switches_wrapper'> </div>
                            <div className='in_fifteen_wrapper'>
                            <RenderCondition condition={currentPoint !== null}>
                                <h1 className='votingName'>{currentPoint?.properties.name}</h1>
                                <p className='votingAdress'>{currentPoint?.properties.addressline}</p>
                                <p className="votingCoordinates">{currentPoint?.geometry.coordinates.toString()}</p>
                                <p className="votingInfo"> {currentPoint?.properties.info}</p>

                                <p className='opinion'>Express your opinion</p>
                                <div className="voting_buttons">
                                    <div className="yes center btn"><img src={Thumb}></img>I agree</div>
                                    <div className="no center btn"><img className="thumbRotate"src={Thumb}></img>I disagree</div>
                                </div>
                            </RenderCondition>
                                <RenderCondition condition={currentPoint === null}>
                                    <h2>Choose some point on map!</h2>
                                </RenderCondition>
                            </div>
                    </div>
                
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