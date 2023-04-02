import React from 'react';
import Footsteps from "/src/assets/icons/footsteps.svg"
import OrangeCheck from "/src/assets/icons/orange-check.svg"


function Card({name,address,distance,duration, color,lng,lat}) {
    return (
        <div className="card" style={{borderColor: color, borderWidth: 5}}>
            <div className='card_content_wapper'>
            <h1>{name}</h1>
            <p>{address}</p>
            <div className='card_metrics'>
                <div className='dis_dur_wrapper'>
                    <img src={Footsteps}></img>
                    <span>{distance}</span>
                </div>
                <div className='dis_dur_wrapper'>
                    <img src={OrangeCheck}></img>
                    <span>{duration}</span>
                </div>
                <div>
                    <a target="_blank"
                       href={"https://www.google.com/maps/place/" + lat + ',' + lng}
                       className="btn-secondary btn btn-sm">
                        <i className="fab pe-2 fa-google"/>
                        Google Maps
                    </a>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Card;