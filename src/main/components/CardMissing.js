import React from 'react';
import Footsteps from "/src/assets/icons/footsteps.svg"
import OrangeCheck from "/src/assets/icons/orange-check.svg"


function CardMissing({name}) {
    return (
        <div className="card bg-danger">
            <div className='card_content_wapper'>
                <p className="m-0" ><strong>{name}</strong></p>
            </div>
        </div>
    );
}

export default CardMissing;