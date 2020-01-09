import React, {createContext, useContext, useState} from 'react';
import {MapDisplayContext} from "./MapDisplayContext";
export const MapCollapseContext = createContext();

export const MapCollapseProvider = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [mapHeight , setMapHeight] = useState({ width: '100vw', height: '100vh' });
    const {mapDisplayState, setMapDisplayState, clickMap} = useContext(MapDisplayContext);
    const handleExpandClick = (e) => {
        console.log('H');
        setExpanded(!expanded);
        if(expanded) setMapHeight({ width: '100vw', height: '100vh' });
        if(!expanded) setMapHeight({ width: '100vw', height: '70vh' });
        console.log('HELLLOOOOOOOO',expanded);
    };
    return (
        <MapCollapseContext.Provider value = {{handleExpandClick, mapDisplayState, expanded, mapHeight}}>
            {props.children}
        </MapCollapseContext.Provider>
    )
};
