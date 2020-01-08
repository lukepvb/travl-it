import React, {useContext}  from 'react';
import {MapDisplayContext} from '../context/MapDisplayContext'



function Image(props){
  const { mapDisState } = useContext(MapDisplayContext);
  console.log('APPP JSSSS',mapDisState);
  let images = [];
  if (mapDisState.clickedMarker.imgURL) {
    for (let i = 0; i < mapDisState.clickedMarker.imgURL.length; i += 1) {
    let img = mapDisState.clickedMarker.imgURL[i];
    images.push(<img src={img} key={i}/>)
  }
  }
  return(
    <div>
        {images}
    </div>
  )
}

export default Image;
