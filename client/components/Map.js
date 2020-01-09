import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import mapStyle from "../mapStyle";
import React, {useContext, useEffect} from "react";
import { MapDisplayContext } from "../context/MapDisplayContext";


const Map = (props) =>  {
    const {mapDisplayState, clickMarker, clickMap, setMapDisplayState} = useContext(MapDisplayContext);
    let currentMarkerList = mapDisplayState.markerList;

    useEffect((state) =>{
        fetch('/api')
            .then(res => res.json())
            .then(res => {
                setMapDisplayState (
                    ...mapDisplayState
                )
            })
        }, []);
    // const markerList = rawMarkers;
    // console.log('LOADING MARKERLIST', rawMarkers);
    // setMapDisplayState(
    //     ...mapDisplayState,
    //     markerList
    // );


    // if (mapDisplayState.savedTag) {
    //     currentMarkerList = currentMarkerList.filter((marker) => {
    //         return marker.tag === mapDisplayState.savedTag;
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
