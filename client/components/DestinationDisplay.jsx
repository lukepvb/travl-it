import React from 'react';
import PhotoDisplay from './PhotoDisplay.jsx';
import DescriptionDisplay from './DescriptionDisplay.jsx';


const DestinationDisplay = props => {

  return (
    <div> 
      <h2>Destination Display</h2>
      <PhotoDisplay />
      <DescriptionDisplay />
    </div>
  )
}

export default DestinationDisplay;