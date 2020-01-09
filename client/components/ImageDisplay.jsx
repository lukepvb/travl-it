import React, {useContext}  from 'react';
import {MapDisplayContext} from '../context/MapDisplayContext'



const Image = (props) => {
  const { mapDisplayState } = useContext(MapDisplayContext);
  const images = [];
  if (mapDisplayState.clickedMarker.imgURL) {
    for (let i = 0; i < mapDisplayState.clickedMarker.imgURL.length; i += 1) {
    const img = mapDisplayState.clickedMarker.imgURL[i];
    images.push(<img src={img} key={i}/>)
  }
  }
  return(
    <div>
        {images}
    </div>
  )
};

export default Image;
