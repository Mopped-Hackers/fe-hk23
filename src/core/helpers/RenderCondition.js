import React from 'react';

function RenderCondition({condition,children}) {
    if(!condition){
        return null;
    }
    return (
        <>
            {children}
        </>
    );
}

export default RenderCondition;