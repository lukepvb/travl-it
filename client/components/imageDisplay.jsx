import React, { Component } from 'react';

function Image({clickedMarker}){
  let images = [];
  if (clickedMarker.imgURL) {
    for (let i = 0; i < clickedMarker.imgURL.length; i += 1) {
    let img = clickedMarker.imgURL[i];
    images.push(<img src={img} />)
  }
  }
  
  return(
    <div>
        

        {images}

    </div>
  )
}

export default Image;