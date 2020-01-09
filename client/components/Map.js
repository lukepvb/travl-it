import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import mapStyle from "../mapStyle";
import React, { useContext, useEffect, useState } from "react";
import { MapDisplayContext } from "../context/MapDisplayContext";


const Map = (props) => {
  const { mapDisplayState, clickMarker, clickMap, setMapDisplayState } = useContext(MapDisplayContext);

  // retrieve all markers, runs once
  useEffect(() => {
    fetch('/api/trips/all')
      .then(res => res.json())
      .then(finalStops => {
        setMapDisplayState({
          ...mapDisplayState,
          finalStops
        });
      })
      .catch(err => {
        console.log(`ERROR: Map useEffect Fetch ERROR: ${err}`);
      });
  }, [mapDisplayState]);

  return (
    <GoogleMap
      onClick={clickMap}
      defaultZoom={4}
      defaultCenter={{ lat: 39.82, lng: -98.57 }}
      defaultOptions={{ styles: mapStyle }}
    >
      {mapDisplayState.finalStops.map((stop, i) => (
        <Marker
          onClick={clickMarker}
          key={i}
          position={{ lat: stop.location.coordinates[1], lng: stop.location.coordinates[0] }}
        />
      ))
      }
    </GoogleMap>
  )
};

export default withScriptjs(withGoogleMap(Map));
