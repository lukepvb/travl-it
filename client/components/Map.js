import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import mapStyle from "../mapStyle";
import React, {useContext, useEffect} from "react";
import { MapDisplayContext } from "../context/MapDisplayContext";

function Map(props) {
    const {mapDisState, clickMarker, clickMap, setMapDisState} = useContext(MapDisplayContext);
    let currentMarkerList = mapDisState.markerList;
    console.log(mapDisState);

    useEffect((state) =>{
        fetch('/api')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMapDisState (
                    ...mapDisState
                )
            })
        }, []);
    // const markerList = rawMarkers;
    // console.log('LOADING MARKERLIST', rawMarkers);
    // setMapDisState(
    //     ...mapDisState,
    //     markerList
    // );


    // if (mapDisState.savedTag) {
    //     currentMarkerList = currentMarkerList.filter((marker) => {
    //         return marker.tag === mapDisState.savedTag;
    //     })
    // }

    return (
        <GoogleMap
            onClick={clickMap}
            defaultZoom={4}
            defaultCenter={{ lat: 39.82, lng: -98.57 }}
            defaultOptions={{ styles: mapStyle }}
        >
            {currentMarkerList.map((marker, i) => (
                <Marker
                    onClick={clickMarker}
                    key={i}
                    position={{ lat: marker.location.lat, lng: marker.location.lng }}
                />
            ))
            }
        </GoogleMap>
    )
}

export default withScriptjs(withGoogleMap(Map));
