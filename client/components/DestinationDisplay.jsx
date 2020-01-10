import React, { useContext } from 'react';
import PhotoDisplay from './PhotoDisplay.jsx';
import DescriptionDisplay from './DescriptionDisplay.jsx';
import MapContainer from './MapRoute.jsx';
import Map from './Map.js';
import { MapDisplayContext } from '../context/MapDisplayContext';



const DestinationDisplay = props => {


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2>Trip Name</h2>
      <MapContainer />
      <PhotoDisplay />
      <DescriptionDisplay />
    </div>
  )
};

export default DestinationDisplay;
