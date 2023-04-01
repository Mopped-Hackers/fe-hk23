import React, {useContext, useEffect, useState} from "react"
import {version} from "../../config";

const SystemContext = React.createContext(null);

export function useSystem() {
    return useContext(SystemContext);
}

export function System({children, ...props}) {

    const System = {
        Security: {

        },
        version,
        ...props
    };

    // useEffect(() => {
    //
    //     const ListenerInterval = setInterval(() => {
    //
    //
    //     }, 500);
    //     return () => {
    //         clearInterval(ListenerInterval);
    //     };
    // }, []);

    return (
        <SystemContext.Provider value={System}>
            {children}
        </SystemContext.Provider>
    )
}
