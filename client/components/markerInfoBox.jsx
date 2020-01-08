import React, { useState, useContext } from 'react';
import {MapDisplayContext} from "../context/MapDisplayContext";

const Box = (props) =>{
    const {mapDisState} = useContext(MapDisplayContext);
    const [isClicked, setIsClicked] = useState('');
  return(
    <div className = "markerInfoBox">
      <p>
      tag: {mapDisState.clickedMarker.tag}
      </p>
      <p>
      description: {mapDisState.clickedMarker.description}
      </p>
    </div>
  )
};

export default Box;
