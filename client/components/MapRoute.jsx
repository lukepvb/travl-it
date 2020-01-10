import React, { useContext } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, DirectionsRenderer, Marker, Polyline } from 'react-google-maps';

function Map(props) {

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
    >
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapRoute() {
  return (
    <div style={{width: '95vw', height: '50vh'}}>
      <WrappedMap
      googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyANq9H8F3LekACFLwylqb9dGv-Bgj2-kww'}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}

    />
    </div>
  )
}
