import React, {createContext, useState} from 'react';
import useInput from "../hooks/UseInput";
export const MapDisplayContext = createContext();

export const MapDisplayProvider = (props) => {
    const [mapDisState, setMapDisState] = useState({
        markerList: [],
        searchTag: '',
        savedTag: '',
        clickedMarker: '',
        images: [],
    });

    const clickMarker = (value) => {
        const markerList = mapDisState.markerList.filter((marker) => {
            return (marker.location.lat == e.latLng.lat() && marker.location.lng == e.latLng.lng())
        });

        setMapDisState({
            ...mapDisState,
            markerList
        })
    };
    const clickMap =  (e) => {
        // const newMarker = { tag: '', location: { lat: e.latLng.lat(), lng: e.latLng.lng() }, description: '' }
        // const markerList = [...mapDisState.markerList, newMarker];
        // let response = await fetch('/addMarker', {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     body: JSON.stringify({ ...newMarker, longitude: newMarker.location.lng, latitude: newMarker.location.lat, savedTag: '' }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //
        // });
        setMapDisState({
            ...mapDisState
        })
    };
    const handleTagSubmit = () => {
        const [searchTag, setSearchState, reset] = useInput('');
        const savedTag = mapDisState.savedTag;
        setMapDisState({
            ...mapDisState,
            savedTag,
            searchTag
        });
    };
    return (
        <MapDisplayContext.Provider value = {{mapDisState, clickMarker, clickMap, handleTagSubmit}}>
            {props.children}
        </MapDisplayContext.Provider>
    )
};
