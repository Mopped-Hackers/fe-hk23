import React from 'react';

function Isset({value, children}) {

    if (value){
        return (
            {children}
        )
    }
    return (
        <></>
    );
}

export default Isset;