import React, { useState, useContext } from 'react';
import {MapDisplayContext} from "../context/MapDisplayContext";

const MarkerInfoBox = (props) =>{
    const {mapDisplayState} = useContext(MapDisplayContext);
    const [isClicked, setIsClicked] = useState('');
  return(
    <div className = "markerInfoBox">
      <p>
      tag: {mapDisplayState.clickedMarker.tag}
      </p>
      <p>
      description: {mapDisplayState.clickedMarker.description}
      </p>
    </div>
  )
};

export default MarkerInfoBox;
