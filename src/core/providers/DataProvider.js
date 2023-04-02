import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

export const DataProviderContext = React.createContext(null);

export function useDataProvider() {
    return useContext(DataProviderContext);
}

function DataProvider({children}) {

    const [score, setScore] = useState(0);

    useEffect(() => {
        axios.get("http://vps.andrejvysny.sk:8000/ai/default-town").then(r=>{setScore(r.data);        });
    }, []);


    const DATA = {
        score, setScore
    };

    return (
       <DataProviderContext.Provider value={DATA}>
           {children}
       </DataProviderContext.Provider>
    );
}

export default DataProvider;