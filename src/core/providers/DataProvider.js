import React, {useContext, useEffect, useState} from 'react';

export const DataProviderContext = React.createContext(null);

export function useDataProvider() {
    return useContext(DataProviderContext);
}

function DataProvider({children}) {

    const [data, setData] = useState();

    useEffect(() => {

    }, []);


    const DATA = {
        data, setData
    };

    return (
       <DataProviderContext.Provider value={DATA}>
           {children}
       </DataProviderContext.Provider>
    );
}

export default DataProvider;