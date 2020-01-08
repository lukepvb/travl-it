//this is a react component wow

import React, {useState} from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import mapStyle from '../mapStyle';

//------- MY CODE --------------------------------------
function MapDisplay(props) {
  const useInput = init => {
    const [value, setValue] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    };
    // return the value with the onChange function instead of setValue function
    return [value, onChange];
  };
  const [searchTag, setSearchState] = useInput('');
//------- MY CODE --------------------------------------

  let currentMarkerList = props.markerList;
  let clickMap = props.clickMap;
  let clickMarker = props.clickMarker;
  if (props.savedTag) {
    currentMarkerList = currentMarkerList.filter((marker) => {
      return marker.tag === props.savedTag;
    })
  }
  function Map() {
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

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (
    <div>
      <div>
        <input
            id="searchTag"
            type="text"
            name="searchTag"
            placeholder="Filter marker by tag"
            onChange={setSearchState}
            value={searchTag}
        />
        <button onClick={props.buttonSubmit}>submit</button>
      </div>
      <div style={{ width: '70vw', height: '70vh' }}>
        <MapWrapped
          googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyANq9H8F3LekACFLwylqb9dGv-Bgj2-kww'}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  )


}
export default MapDisplay;
