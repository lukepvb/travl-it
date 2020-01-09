import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import mapStyle from "../mapStyle";
import React, {useContext, useEffect, useState} from "react";
import { MapDisplayContext } from "../context/MapDisplayContext";

//__________________________________________________
import MarkerForm from './MarkerForm.jsx'

import { makeStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';

import { red } from '@material-ui/core/colors';

//________________________________________________






const Map = (props) =>  {
    const {mapDisplayState, clickMarker, clickMap, setMapDisplayState} = useContext(MapDisplayContext);
    let currentMarkerList = mapDisplayState.markerList;
    useEffect((state) =>{
        console.log('YOOOO');
        fetch('/api/trips/all')
            .then(res => {
                console.log('hellloooooo');
                return res.json();
            })
            .then(res => {
                console.log(res);
                let markerList = [...mapDisplayState, ...res];
                setMapDisplayState (
                    ...mapDisplayState,
                markerList
                )
            })
        }, []);


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
};

export default withScriptjs(withGoogleMap(Map));
