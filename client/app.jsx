
import React, {useEffect, useContext} from 'react';
import { render } from 'react-dom';
import MapDisplay from './components/mapDisplay.jsx';
import MarkerForm from './components/markerForm.jsx';
import ImageDisplay from './components/imageDisplay.jsx';
import MarkerInfoBox from './components/markerInfoBox.jsx';
import TagSearch from "./components/TagSearch";
import style from './style.css'
import { Animated } from 'react-animated-css';
import { MapDisplayProvider} from "./context/MapDisplayContext";
//this one renders ya know the app.
const App = (props) => {
   return (
    <div id="map">
      <MapDisplayProvider>
      {/* header / title */}
      {/* map display */}
      <div className="centerArea">
        <div className="mapDisplay">
            <MapDisplay />
        </div>
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <h1 className="title">
            Dear Travel Diary...
          </h1>
        </Animated>
      </div>
      <div className="infoBox">
        <TagSearch/>
        {/* Tag and description to the right of the map */}
        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
          <MarkerInfoBox/>
        </Animated>
        <ImageDisplay/>
      </div>
      <MarkerForm/>
    </MapDisplayProvider>
    </div>
   )
};
export default App;
