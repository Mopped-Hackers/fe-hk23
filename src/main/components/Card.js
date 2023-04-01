import React from 'react';

function Card({name,address,distance,duration}) {
    return (
        <div className="card">
            <h1>{name}</h1>
            <p>{address}</p>
            <div>
                <span>{distance}</span>
                <span>{duration}</span>
            </div>
        </div>
    );
}

export default Card;