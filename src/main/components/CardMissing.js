import React from 'react';
import Footsteps from "/src/assets/icons/footsteps.svg"
import OrangeCheck from "/src/assets/icons/orange-check.svg"


function CardMissing({name,address,distance,duration,color}) {
    return (
        <div className="card bg-danger" style={{backgroundColor: color}}>
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
            </div>
            </div>
        </div>
    );
}

export default CardMissing;