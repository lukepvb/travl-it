import React, {createContext, useState} from 'react';
import useInput from "../hooks/UseInput";
export const MapDisplayContext = createContext();

export const MapDisplayProvider = (props) => {
        const [mapDisplayState, setMapDisplayState] = useState({
        markerList: [],
        searchTag: '',
        savedTag: '',
        clickedMarker: '',
        images: [],
    });
    const clickMarker = (value) => {
        const markerList = mapDisplayState.markerList.filter((marker) => {
            return (marker.location.lat == e.latLng.lat() && marker.location.lng == e.latLng.lng())
        });

        setMapDisplayState({
            ...mapDisplayState,
            markerList
        })
    };
    const clickMap =  (e) => {
        const newMarker = { tag: '', location: { lat: e.latLng.lat(), lng: e.latLng.lng() }, description: '' }
        const markerList = [...mapDisplayState.markerList, newMarker];
        // let response = await fetch('/addMarker', {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     body: JSON.stringify({ ...newMarker, longitude: newMarker.location.lng, latitude: newMarker.location.lat, savedTag: '' }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //
        // });
        console.log('CLIIIICKED',e);
        setMapDisplayState({
            ...mapDisplayState,
            markerList
        });
        console.log(mapDisplayState);
    };
    const handleTagSubmit = () => {
        const [searchTag, setSearchState, reset] = useInput('');
        const savedTag = mapDisplayState.savedTag;
        setMapDisplayState({
            ...mapDisplayState,
            savedTag,
            searchTag
        });
    };
    return (
        <MapDisplayContext.Provider value = {{mapDisplayState, clickMarker, clickMap, handleTagSubmit}}>
            {props.children}
        </MapDisplayContext.Provider>
    )
};
