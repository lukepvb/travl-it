import React, { createContext, useState } from 'react';
import useInput from "../hooks/UseInput";
export const MapDisplayContext = createContext();

export const MapDisplayProvider = (props) => {
  const [mapDisplayState, setMapDisplayState] = useState({
    finalStops: [],
    clickedMarker: '',
    images: [],
    trip: {},
  });

  const clickMarker = (e) => {
    const finalStops = mapDisplayState.finalStops.filter((stop) => {
      return (stop.location.coordinates[1] === e.latLng.lat() && stop.location.coordinates[0] === e.latLng.lng());
    });
    fetch(`/api/trips/${finalStops[0].tripId}`)
      .then(res => res.json())
      .then(trip => {
        if (trip) {
          setMapDisplayState({
            ...mapDisplayState,
            finalStops,
            trip
          });
        }
      })
  };

  const clickMap = (e) => {
    const newTrip = {
      comments: [],
      stops: [
        {
          index: 0,
          location: {
            type: 'Point',
            coordinates: [e.latLng.lng(), e.latLng.lat()]
          },
          pics: [],
          stop_comments: []
        }
      ],
      finalStop: {
        location: {
          type: 'Point',
          coordinates: [e.latLng.lng(), e.latLng.lat()]
        }
      }
    }

    fetch('/api/trips/create', {
      method: 'POST',
      body: JSON.stringify(newTrip),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(trip => {
        setMapDisplayState({
          ...mapDisplayState,
          trip,
        });
        console.log('trip: ', trip)
        console.log(`mapDisplayState: `, mapDisplayState);
      })
      .catch(err => {
        console.log(`ERROR: ${err}`);
      })
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
    <MapDisplayContext.Provider value={{ setMapDisplayState, mapDisplayState, clickMarker, clickMap, handleTagSubmit }}>
      {props.children}
    </MapDisplayContext.Provider>
  )
};
