import React, { Component } from 'react';

const Box = ({clickedMarker}) =>{
  return(
    <div className = "testing">
      <p>
      tag: {clickedMarker.tag}
      </p>
      <p>
      description: {clickedMarker.description}
      </p>
    </div>
  )
}

export default Box;